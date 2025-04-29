export default async function createShop(
    token: string, 
    name: string, 
    address: string, 
    tel: string, 
    openTime: string, 
    closeTime: string
) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/massage-shops`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                address: address,
                tel: tel,
                openTime: openTime,
                closeTime: closeTime,
            }),
        });
        const resText = await response.text();
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        console.log('Shop created successfully');
        return JSON.parse(resText);
    } catch (error) {
        console.error('Failed to create shop:', error);
        throw error;
    }
}
