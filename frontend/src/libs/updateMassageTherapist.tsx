export default async function updateMassageTherapist(
    token: string, 
    name: string, 
    tel: string,
    birthdate: string,
    sex: string, 
    specialties: string[],
    availability: string[],
    Id: string
) {
    try {
        // Log data for debugging
        // console.log('updating therapist with data:', {
        //     name, tel, birthDate: birthdate, sex, specialty: specialties, available: availability
        // });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/therapists/${Id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                tel: tel,
                birthDate: birthdate, // Make sure the D is capitalized
                sex: sex.toLowerCase(), // Ensure lowercase
                specialty: specialties, // API expects 'specialty' not 'specialties'
                available: availability // API expects 'available' not 'availability'
            }),
        });
        
        // Get response text for better error handling
        const resjson = await response.json();
        if (!response.ok) {
            throw new Error(resjson.error);
        }
        
        console.log('Therapist updated successfully:', resjson);
        return resjson;
    } catch (error) {
        alert(error);
    }
}
