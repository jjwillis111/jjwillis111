// Fetches and displays the latest United States national debt from the Fiscal Data API
// https://fiscaldata.treasury.gov/api-documentation/
function fetchDebt() {
  fetch('https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1')
    .then(resp => resp.json())
    .then(data => {
      if (data && data.data && data.data.length > 0) {
        const record = data.data[0];
        const amount = Number(record.tot_pub_debt_out_amt);
        const date = record.record_date;
        const debtEl = document.getElementById('debt-value');
        const dateEl = document.getElementById('debt-date');
        if (debtEl) {
          debtEl.textContent = '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        if (dateEl) {
          dateEl.textContent = date;
        }
      }
    })
    .catch(err => console.error('Failed to fetch debt data:', err));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchDebt);
} else {
  fetchDebt();
}
