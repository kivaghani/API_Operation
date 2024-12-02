import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";




const APINameMasterForm = () => {
    const [formData, setFormData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [locks, setLocks] = useState([]); 


    const initialValues = {
        apiName: '',
        url: '',
        price: '',  
        subscription: '',
        tender: '',
        isActive: 'yes'
    };

    const validationSchema = Yup.object().shape({
        apiName: Yup.string().required('Required'),
        url: Yup.string().url('Invalid URL').required('Required'),
        price: Yup.number().required('Required'),
        subscription: Yup.string().required('Required'),
        tender: Yup.string().required('Required'),
        isActive: Yup.string().required('Required'),
    });

    const onSubmit = (values) => {
        if (editIndex !== null) {
            const updatedFormData = [...formData];
            updatedFormData[editIndex] = values;
            setFormData(updatedFormData);
            setEditIndex(null);
        } else {
            setFormData([...formData, values]);
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedFormData = formData.filter((_, i) => i !== index);
        setFormData(updatedFormData);
    };

    const toggleLock = (index) => {
        const updatedLocks = [...locks];
        updatedLocks[index] = !locks[index];
        setLocks(updatedLocks);
        if (locks[index]) {
            setEditIndex(null); 
        }
    };

    return (
        <>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ resetForm }) => (
                <Form className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="apiName" className="block text-sm font-medium text-gray-700">API Name</label>
                        <Field name="apiName" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="apiName" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                        <Field name="url" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="url" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <Field name="price" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="price" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="subscription" className="block text-sm font-medium text-gray-700">Subscription</label>
                        <Field name="subscription" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="subscription" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="tender" className="block text-sm font-medium text-gray-700">Select Tender</label>
                        <Field as="select" name="tender" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Select...</option>
                            <option value="tender1">Tender 1</option>
                            <option value="tender2">Tender 2</option>
                        </Field>
                        <ErrorMessage name="tender" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Is Active?</label>
                        <div className="ml-6 space-x-4">
                            <label className="inline-flex items-center">
                                <Field name="isActive" type="radio" value="yes" className="form-radio h-4 w-4 text-indigo-600" />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <Field name="isActive" type="radio" value="no" className="form-radio h-4 w-4 text-indigo-600" />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        <ErrorMessage name="isActive" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={locks.some(lock => lock)}>Submit</button>
                        <button type="button" onClick={resetForm} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Reset</button>
                    </div>
                </Form>
            )}
        </Formik>
        {formData.length > 0 &&
            <table className="table-auto w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Active?</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {formData.map((data, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{data.apiName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{data.url}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{data.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{data.subscription}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{data.tender}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{data.isActive}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => handleEdit(index)} disabled={locks[index]} className={`text-indigo-600 hover:text-indigo-900 ${locks[index] && 'cursor-not-allowed text-gray-400'}`}><FaRegEdit />
                            </button>
                                        <button onClick={() => handleDelete(index)} disabled={locks[index]} className={`text-red-600 hover:text-red-900 ml-2 ${locks[index] && 'cursor-not-allowed text-gray-400'}`}><MdDelete />
                                        </button>
                                        <button type="button" onClick={() => toggleLock(index)} className="px-2 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-green-800 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">
                                            {locks[index] ? <FaLockOpen /> : <FaLock />}
                                        </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        </>
    );
};

export default APINameMasterForm;
