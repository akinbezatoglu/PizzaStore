import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Modal from 'react-modal';

import PizzaSvg from './assets/pizza.svg';

Modal.setAppElement('#root');

function Pizza() {
    const API_URL = '/pizzas';
    const PageSize = 8;

    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPizzaName, setNewPizzaName] = useState('');
    const [newPizzaDescription, setNewPizzaDescription] = useState('');

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pizzaToDelete, setPizzaToDelete] = useState(null);

    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [pizzaToUpdate, setPizzaToUpdate] = useState(null);
    const [updatePizzaName, setUpdatePizzaName] = useState('');
    const [updatePizzaDescription, setUpdatePizzaDescription] = useState('');

    useEffect(() => {
        fetchPizzaData();
    }, [currentPage]);

    const fetchPizzaData = async () => {
        try {
            const response = await fetch(`${API_URL}?Page=${currentPage}&PageSize=${PageSize}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setData(result.items);
            setTotalItems(result.totalItems);
            setTotalPages(Math.ceil(result.totalItems / PageSize));
            setHasNextPage(result.hasNextPage);
            setHasPreviousPage(result.hasPreviousPage);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setFetchError('An error occurred while fetching the data. Please try again later.');
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPaginationNumbers = () => {
        const pageNumbers = [];
        const fixed = 5;
        let first = 1;
        let last = totalPages;

        if (totalPages > fixed) {
            let mid = currentPage;

            if (mid - 2 >= 1) {
                if (mid + 2 <= totalPages) {
                    first = mid - 2;
                    last = mid + 2;
                } else {
                    first = totalPages - fixed + 1;
                    last = totalPages;
                }
            } else {
                last = fixed;
            }
        }

        for (let i = first; i <= last; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-2 py-1 mx-1 rounded ${i === currentPage ? 'bg-teal-600 text-white' : 'bg-gray-200 text-teal-800'}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewPizzaName('');
        setNewPizzaDescription('');
    };

    const handleCreatePizza = async () => {
        const newPizza = {
            name: newPizzaName,
            description: newPizzaDescription,
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPizza),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            closeModal();
            fetchPizzaData(); // Refresh the list after adding a new pizza
        } catch (error) {
            console.error('Error creating pizza:', error);
            setError('An error occurred while creating the pizza. Please try again later.');
        }
    };

    const openDeleteModal = (pizza) => {
        setPizzaToDelete(pizza);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setPizzaToDelete(null);
    };

    const handleDeletePizza = async () => {
        try {
            const response = await fetch(`${API_URL}/${pizzaToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.status == 204) { // No Content
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            closeDeleteModal();

            if ((currentPage * PageSize - totalItems) == (PageSize - 1)) {
                setCurrentPage(p => p - 1);
            }
            fetchPizzaData(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting pizza:', error);
            setError('An error occurred while deleting the pizza. Please try again later.');
        }
    };

    const openUpdateModal = (pizza) => {
        setPizzaToUpdate(pizza);
        setUpdatePizzaName(pizza.name);
        setUpdatePizzaDescription(pizza.description);

        setUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setUpdateModalOpen(false);
        setPizzaToUpdate(null);
    };

    const handleUpdatePizza = async () => {
        if (!pizzaToUpdate) return;

        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: pizzaToUpdate.id,
                    name: updatePizzaName,
                    description: updatePizzaDescription,
                }),
            });

            if (!response.status == 204) { // No Content
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            closeUpdateModal();
            fetchPizzaData(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error updating pizza:', error);
            setError('An error occurred while updating the pizza. Please try again later.');
        }
    };

    return (
        <div
            className='min-h-screen flex flex-col overflow-hidden
            p-4 sm:p-6 lg:p-8 justify-center relative items-center text-white
            bg-gradient-to-br from-slate-900 via-teal-900 to-slate-700'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className='w-full mx-auto mt-10 p-4 sm:p-6 md:p-8 border-double border-2 border-teal-600
                bg-zinc-950 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl'
            >
                <h2
                    className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center
                    bg-gradient-to-r from-slate-400 via-teal-400 text-transparent bg-clip-text'
                >
                    Pizza Menu
                </h2>
                <div className='flex justify-end items-center mb-4'>
                    <button
                        onClick={openModal}
                        className='px-4 py-2 bg-teal-800 text-white rounded'
                    >
                        Create New Pizza
                    </button>
                </div>
                <div className="space-y-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : fetchError ? (
                        <p>{fetchError}</p>
                    ) : (
                        <ul className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                            {data.map(pizza => (
                                <li key={pizza.id} id={pizza.id}>
                                    <div className='space-y-6'>
                                        <motion.div
                                            className='p-4 bg-teal-950 bg-opacity-80 rounded-lg border-solid border-2 border-teal-600'
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className='flex flex-row justify-between'>
                                                <h3 className='text-sm sm:text-md md:text-lg font-bold mb-2 sm:mb-3 line-clamp-1
                                                    bg-gradient-to-r from-slate-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text'
                                                >{pizza.name}</h3>
                                                <div>
                                                    <button
                                                        onClick={() => openDeleteModal(pizza)}
                                                        className='top-2 right-2 m-1 bg-red-600 text-white rounded'
                                                    >
                                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => openUpdateModal(pizza)}
                                                        className='top-2 right-2 m-1 bg-teal-600 text-white rounded'
                                                    >
                                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v12M6 12h12'></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className='text-sm text-justify font-sans text-gray-300 line-clamp-3 no-underline'>{pizza.description}</p>
                                        </motion.div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='flex justify-between items-center mt-6'>
                    <button
                        onClick={handlePreviousPage}
                        disabled={!hasPreviousPage}
                        className='px-4 py-2 bg-teal-800 text-white rounded disabled:opacity-50'
                    >
                        Previous
                    </button>
                    <div className='flex'>
                        {renderPaginationNumbers()}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={!hasNextPage}
                        className='px-4 py-2 bg-teal-800 text-white rounded disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>
            </motion.div>
            {/* Modal for creating a new pizza */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Create New Pizza"
                className='bg-zinc-950 bg-opacity-95 rounded-xl p-6 mx-auto w-4/5 lg:w-2/5 shadow-xl border-double border-2 border-teal-600'
                overlayClassName='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center'
            >
                <h2 className='text-lg sm:text-xl font-bold mb-4 text-teal-400 text-center'>Create New Pizza</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleCreatePizza(); }}>
                    <div className='mb-4'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-teal-100">Pizza Name</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <img className='filter invert' width="20rem" src={PizzaSvg} alt='pizza_svg' />
                            </div>
                            <input
                                id='name'
                                type='text'
                                value={newPizzaName}
                                onChange={(e) => setNewPizzaName(e.target.value)}
                                className='bg-teal-950 border border-teal-300 text-teal-200 text-sm rounded-lg block w-full ps-10 p-2.5'
                                required
                            />
                        </div>



                    </div>
                    <div className='mb-4'>
                        <label htmlFor='description' className='block mb-2 text-sm font-medium text-teal-100'>Description</label>
                        <textarea
                            id='description'
                            value={newPizzaDescription}
                            onChange={(e) => setNewPizzaDescription(e.target.value)}
                            className='bg-teal-950 border border-teal-300 text-teal-200 text-sm rounded-lg block w-full p-2.5 min-h-48'
                            required
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='px-4 py-2 mr-2 bg-gray-500 text-white rounded'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-teal-600 text-white rounded'
                        >
                            Create
                        </button>
                    </div>
                </form>
            </Modal>
            {/* Modal for editing pizza */}
            <Modal
                isOpen={updateModalOpen}
                onRequestClose={closeUpdateModal}
                contentLabel="Edit Pizza"
                className='bg-zinc-950 bg-opacity-95 rounded-xl p-6 mx-auto w-4/5 lg:w-2/5 shadow-xl border-double border-2 border-teal-600'
                overlayClassName='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center'
            >
                <h2 className='font-bold text-base mb-4 text-teal-400 text-center'>Edit <span className='text-teal-200 text-base'>{pizzaToUpdate?.name}</span> Pizza</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdatePizza(); }}>
                    <div className='mb-4'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-teal-100">Pizza Name</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <img className='filter invert' width="20rem" src={PizzaSvg} alt='pizza_svg' />
                            </div>
                            <input
                                id='name'
                                type='text'
                                value={updatePizzaName}
                                onChange={(e) => setUpdatePizzaName(e.target.value)}
                                className='bg-teal-950 border border-teal-300 text-teal-200 text-sm rounded-lg block w-full ps-10 p-2.5'
                                required
                            />
                        </div>



                    </div>
                    <div className='mb-4'>
                        <label htmlFor='description' className='block mb-2 text-sm font-medium text-teal-100'>Description</label>
                        <textarea
                            id='description'
                            value={updatePizzaDescription}
                            onChange={(e) => setUpdatePizzaDescription(e.target.value)}
                            className='bg-teal-950 border border-teal-300 text-teal-200 text-sm rounded-lg block w-full p-2.5 min-h-48'
                            required
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='button'
                            onClick={closeUpdateModal}
                            className='px-4 py-2 mr-2 bg-gray-500 text-white rounded'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-teal-600 text-white rounded'
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </Modal>
            {/* Modal for confirming deletion */}
            <Modal
                isOpen={deleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Pizza Confirmation"
                className='bg-zinc-950 bg-opacity-95 rounded-xl p-6 mx-auto w-full max-w-md flex flex-col items-center'
                overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
            >
                <h2 className='text-xl mb-4 text-center text-gray-200'>Confirm Deletion</h2>
                <p className='text-center text-gray-300'>
                    Are you sure you want to delete <span className='font-bold text-red-400'>{pizzaToDelete?.name}</span>?
                </p>

                <div className='flex justify-end mt-4'>
                    <button
                        type='button'
                        onClick={closeDeleteModal}
                        className='px-4 py-2 mr-2 bg-gray-500 text-white rounded'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeletePizza}
                        className='px-4 py-2 bg-red-600 text-white rounded'
                    >
                        Delete
                    </button>
                </div>
            </Modal>
            {error ? (<p className='text-red-400 pt-2'>{error}</p>) : (<></>)}
        </div>

    )
};

export default Pizza;