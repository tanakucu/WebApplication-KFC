document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const product = await response.json();
            alert('Product added successfully!');
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product. Please try again later.');
        }
    });
});