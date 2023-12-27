export const transformedData = (occupiedObject) => {
  return {
    id: occupiedObject.id,
    reservationId: occupiedObject.reservationId,
    guestName: occupiedObject.guestName.charAt(0).toUpperCase() + occupiedObject.guestName.slice(1),
    guestPhone: occupiedObject.guestPhone,
    guestEmail: occupiedObject.guestEmail,
    roomNumber: occupiedObject.roomNumber,
    roomType: occupiedObject.roomType,
    checkIn: {
      date: new Date(occupiedObject.checkIn).toLocaleString('en-GB', {  day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(occupiedObject.checkIn).toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    checkOut: {
      date: new Date(occupiedObject.checkOut).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(occupiedObject.checkOut).toLocaleString('en-GB', {
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    status: occupiedObject.status.charAt(0) + occupiedObject.status.slice(1).toLowerCase()
  }
}