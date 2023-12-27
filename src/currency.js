export const formatAsUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',    
      currencyDisplay: 'code',
      minimumFractionDigits: 0,  // Set to 0 to hide decimal part when it's .00
      maximumFractionDigits: 2, // Set to 2 to display up to 2 decimal places
    }).format(value);
  };