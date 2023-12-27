export const toLocalDate = (reserveDate) => {
    return new Date(reserveDate).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'})
  }