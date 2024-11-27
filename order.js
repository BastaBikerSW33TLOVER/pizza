function confirmOrder(customerName) {
    
    const modalText = document.getElementById("modalText");
    modalText.textContent = `Are you sure you want to confirm the order for ${customerName}?`;

   
    document.getElementById("confirmModal").dataset.customerName = customerName;


    const modal = document.getElementById("confirmModal");
    modal.style.display = "flex"; 
}


function closeModal() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "none"; 
}


function finalizeOrder() {
    const modal = document.getElementById("confirmModal");
    const customerName = modal.dataset.customerName;

  
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach((row) => {
        if (row.querySelector("td:first-child").textContent === customerName) {
            row.remove();
        }
    });

    closeModal();
}


window.onclick = function (event) {
    const modal = document.getElementById("confirmModal");
    if (event.target === modal) {
        closeModal();
    }
};


document.querySelector(".close").onclick = closeModal;


window.onload = function () {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "none"; 
};
