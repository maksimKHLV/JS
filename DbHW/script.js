document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('table-body');
        
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
          
            <td>${item.Name}</td>
            <td>${item.Age}</td>
            <td>${item.City}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error(error));
  });