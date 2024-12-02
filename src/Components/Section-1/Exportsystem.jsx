import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Exportsystem = () => {
    const [formData, setFormData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedSettings, setSelectedSettings] = useState([]); 
    const [locks, setLocks] = useState([]); 

    const initialValues = {
        name: '',
        title: '',
        query: '',
        setting: [] // Change to array
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        title: Yup.string().required('Required'),
        query: Yup.string().required('Required'),
        setting: Yup.array().min(1, 'At least one setting must be selected') // Ensure at least one setting is selected
    });

    const onSubmit = (values) => {
        setSubmitted(true);
        setSelectedSettings(values.setting); // Set selected settings
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
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <Field name="name" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <Field name="title" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="query" className="block text-sm font-medium text-gray-700">Query</label>
                        <Field name="query" type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        <ErrorMessage name="query" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Settings</label>
                        <div className="ml-6 space-y-2">
                            <label className="inline-flex items-center">
                                <Field type="checkbox" name="setting" value="SFTP" className="form-checkbox h-4 w-4 text-indigo-600" />
                                <span className="ml-2">SFTP Setting</span>
                            </label><br/>
                            <label className="inline-flex items-center">
                                <Field type="checkbox" name="setting" value="AWS" className="form-checkbox h-4 w-4 text-indigo-600" />
                                <span className="ml-2">AWS Setting</span>
                            </label><br/>
                            <label className="inline-flex items-center">
                                <Field type="checkbox" name="setting" value="Email" className="form-checkbox h-4 w-4 text-indigo-600" />
                                <span className="ml-2">Email Setting</span>
                            </label><br/>
                        </div>
                        <ErrorMessage name="setting" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " disabled={locks.some(lock => lock)}>Submit</button>
                        <button type="button" onClick={resetForm} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Reset</button>
                    </div>
                </Form>
            )}
        </Formik>
        {submitted && formData.length > 0 && (
            <div>
                <p>Selected Settings:</p>
                
                <table className="table-auto w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Settings</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {formData.map((data, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data.query}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{data.setting.join(', ')}</td> 
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
        )}
        </>
    );
};

export default Exportsystem;
