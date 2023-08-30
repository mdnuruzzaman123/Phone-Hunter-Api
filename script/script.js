const loadPhone = async (searchText = 'a', isShow) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phone = data.data;
    displayPhone(phone, isShow)
}

loadPhone()

const displayPhone = (phones, isShow) => {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const showAll = document.getElementById('show-all-btn');
    if (phones.length > 12 && !isShow) {
        showAll.classList.remove('hidden');
    } else {
        showAll.classList.add('hidden');
    }
    if (!isShow) {
        phones = phones.slice(0, 12);
    }
    for (const phone of phones) {
        const div = document.createElement('div');
        div.classList = `card bg-base-100 shadow-xl`
        div.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
             <p class="my-2">Brand: ${phone.brand}</p>
            <div class="card-actions">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-sm btn-primary bg-blue-600 border-none ">Show Details</button>
            </div>
        </div>
        `
        container.appendChild(div)

    }
    toggleLoadingSpinner(false);
}

// search function
const inputBtn = (isShow) => {
    toggleLoadingSpinner(true)
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    if (inputValue === '') {
        loadPhone('a', isShow);
    } else {
        loadPhone(inputValue, isShow);
    }
}

// spinner function
const toggleLoadingSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden')
    } else {
        spinner.classList.add('hidden')
    }
}

// show all function
const showAll = () => {
    inputBtn(true);
    const inputField = document.getElementById('input-field');
    inputField.value = '';
}

// show details function
const showDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json()
    const phones = data.data;
    showDataDetails(phones);
}

// showDataDetails function
const showDataDetails = (phones) => {
    console.log(phones);
    const modalField = document.getElementById('modal-container');
    modalField.innerHTML = `
        <dialog id="show_details_modal" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
            <div class="flex justify-center items-center m-3">
                <img src="${phones.image}" alt="">
            </div>
            <div class="space-y-4">
                <h3 class="text-2xl font-bold mt-10 mb-6">${phones.name}</h3>
                <p class="text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <h4 class="font-semibold"><span class="underline">Brand:</span> <span class="text-[#706F6F]">${phones?.brand}</span></h4>
                <h4 class="font-semibold"><span class="underline">Storage:</span> <span class="text-[#706F6F]">${phones.mainFeatures?.storage}</span></h4>
                <h4 class="font-semibold"><span class="underline">Memory:</span> <span class="text-[#706F6F]">${phones.mainFeatures?.memory}</span></h4>
                <h4 class="font-semibold"><span class="underline">Display Size:</span> <span class="text-[#706F6F]">${phones?.mainFeatures?.displaySize}</span></h4>
                <h4 class="font-semibold"><span class="underline">Chipset:</span> <span class="text-[#706F6F]">${phones?.mainFeatures?.chipSet}</span></h4>
                <h4 class="font-semibold"><span class="underline">Slug:</span> <span class="text-[#706F6F]">${phones?.slug}</span></h4>
                <h4 class="font-semibold"><span class="underline">Release Date:</span> <span class="text-[#706F6F]">${phones?.releaseDate}</span></h4>
                <h4 class="font-semibold"><span class="underline">GPS:</span> <span class="text-[#706F6F]">${phones?.others?.GPS || 'No GPS Available'}</span></h4>
            </div>
            <div class="modal-action flex justify-center items-center">
             <button class="btn btn-sm btn-primary bg-blue-600 border-none">Close</button>
            </div>
        </form>
        </dialog>
    `

    show_details_modal.showModal();
}

