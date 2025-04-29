export interface UpdateReservationPayload {
    reservationId: string;
    massageShopId: string;
    reserveDate: string;
    token: string;
  }
  
  export default async function updateReservation({
    reservationId,
    massageShopId,
    reserveDate,
    token,
  }: UpdateReservationPayload) {
    // console.log("updateReservationss", reservationId, massageShopId, reserveDate, token);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/reservations/${reservationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({ test, reserveDate }),
          body: JSON.stringify({
            reserveDate: reserveDate,
            massageShop: massageShopId
        }),
        }
      );
  
      const resText = await response.text();
      if (!response.ok) {
        console.error("API Error:", resText);
        throw new Error("Update reservation failed");
      }
  
      return JSON.parse(resText);
    } catch (error) {
      throw error;
    }
  }