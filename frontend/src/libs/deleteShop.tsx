export default async function deleteShop(token: string, shopId: string){
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/massage-shops/${shopId}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        console.log('Shop deleted successfully');
    } catch (error) {
        console.error('Failed to delete shop:', error);
    }
}
