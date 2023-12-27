export const transformedData = (reservationObject) => {
    return {
      id: reservationObject.id,
      reservationId: reservationObject.reservationId,
      guestName: reservationObject.guestName.charAt(0).toUpperCase() + reservationObject.guestName.slice(1),
      guestEmail: reservationObject.guestEmail,
      totalRoom: 1,
      checkIn: {
        date: new Date(reservationObject.checkIn).toLocaleString('en-GB', {  day: 'numeric',month: 'numeric',year: 'numeric' }),
        time: new Date(reservationObject.checkIn).toLocaleString('en-GB', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).replace(/\s/, ' ').toUpperCase(),
      },
      checkOut: {
        date: new Date(reservationObject.checkOut).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
        time: new Date(reservationObject.checkOut).toLocaleString('en-GB', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).replace(/\s/, ' ').toUpperCase(),
      },
      createdAt: {
        date: new Date(reservationObject.createdAt).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
        time: new Date(reservationObject.createdAt).toLocaleString('en-GB', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).replace(/\s/, ' ').toUpperCase(),
      },
      status: reservationObject.status.charAt(0) + reservationObject.status.slice(1).toLowerCase()
    }
  }