import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Priceconfiguration = () => {
    const [formData, setFormData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [locks, setLocks] = useState([]); 

    const initialValues = {
        configuration: [],
        tender: '',
        tender2: '',
        price: ''
    };

    const validationSchema = Yup.object().shape({
        configuration: Yup.array().required('At least one configuration is required'),
        tender: Yup.string().required('Required'),
        tender2: Yup.string().required('Required'),
        price: Yup.number().required('Required')
    });

    const onSubmit = (values) => {
        const isAnyRowLocked = locks.some(lock => lock);
        if (!isAnyRowLocked) {
            if (editIndex !== null) {
                const updatedFormData = [...formData];
                updatedFormData[editIndex] = values;
                setFormData(updatedFormData);
                setEditIndex(null);
            } else {
                setFormData([...formData, values]);
            }
        }
    };

    const handleEdit = (index) => {
        if (!locks[index]) {
            setEditIndex(index);
        }
    };

    const handleDelete = (index) => {
        if (!locks[index]) {
            const updatedFormData = formData.filter((_, i) => i !== index);
            setFormData(updatedFormData);
        }
    };

    const toggleLock = (index) => {
        const updatedLocks = [...locks];
        updatedLocks[index] = !locks[index];
        setLocks(updatedLocks);
        if (locks[index]) {
            setEditIndex(null); // Reset edit index when unlocking
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ resetForm }) => (
                    <Form className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold">Api Price configuration:</label>
                            <div className="ml-6 space-y-2">
                                <label className="inline-flex items-center">
                                    <Field type="checkbox" name="configuration" value="Price1" className="form-checkbox h-4 w-4 text-indigo-600" />
                                    <span className="ml-2">price 1</span>
                                </label>
                                <label className="inline-flex items-center ml-20">
                                    <Field type="checkbox" name="configuration" value="Price2" className="form-checkbox h-4 w-4 text-indigo-600" />
                                    <span className="ml-2">price 2</span>
                                </label>
                                <label className="inline-flex items-center ml-20">
                                    <Field type="checkbox" name="configuration" value="Price3" className="form-checkbox h-4 w-4 text-indigo-600" />
                                    <span className="ml-2">price 3</span>
                                </label>
                                <label className="inline-flex items-center ml-20">
                                    <Field type="checkbox" name="configuration" value="Price4" className="form-checkbox h-4 w-4 text-indigo-600" />
                                    <span className="ml-2">price 4</span>
                                </label>
                            </div>
                            <ErrorMessage name="configuration" component="div" className="text-red-600 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="tender" className="block text-sm font-medium text-gray-700">Department</label>
                            <Field as="select" name="tender" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select...</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Student">Student</option>
                            </Field>
                            <ErrorMessage name="tender" component="div" className="text-red-600 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="tender2" className="block text-sm font-medium text-gray-700">Category</label>
                            <Field as="select" name="tender2" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select...</option>
                                <option value="one">One</option>
                                <option value="two">Two</option>
                                <option value="three">Three</option>
                            </Field>
                            <ErrorMessage name="tender2" component="div" className="text-red-600 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <Field name="price" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            <ErrorMessage name="price" component="div" className="text-red-600 text-sm" />
                        </div><br/>
                        <div className="flex gap-3">
                        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={locks.some(lock => lock)}>Submit</button>
                        <button type="button" onClick={resetForm} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Reset</button>
                    </div>
                    </Form>
                )}
            </Formik>
            {formData.length > 0 &&
                <div>
                    <table className="table-auto w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Configuration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.configuration.join(', ')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.tender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.tender2}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{data.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => handleEdit(index)} disabled={locks[index]} className={`text-indigo-600 hover:text-indigo-900 ${locks[index] && 'cursor-not-allowed text-gray-400'}`}>Edit</button>
                                        <button onClick={() => handleDelete(index)} disabled={locks[index]} className={`text-red-600 hover:text-red-900 ml-2 ${locks[index] && 'cursor-not-allowed text-gray-400'}`}>Delete</button>
                                        <button type="button" onClick={() => toggleLock(index)} className="px-2 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">
                                            {locks[index] ? "Unlock" : "Lock"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
};

export default Priceconfiguration;
