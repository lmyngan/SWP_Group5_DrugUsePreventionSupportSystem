import { useState, useEffect } from "react";
import { getFullAccount } from "../service/api";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";


const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Consultant" },
    { id: 4, name: "Member" },
];

// Format date theo dd/MM/yyyy
const formatDateVN = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d)) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const Account = () => {
    const [accounts, setAccounts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editRole, setEditRole] = useState(4);
    const [showAdd, setShowAdd] = useState(false);
    const [newAccount, setNewAccount] = useState({
        accountname: "",
        password: "",
        fullName: "",
        dateOfBirth: "",
        gender: "Male",
        address: "",
        role_id: 4,
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            const data = await getFullAccount();
            if (Array.isArray(data)) setAccounts(data);
            else setAccounts([]);
        };
        fetchAccounts();
    }, []);

    // Edit role
    const handleEditRole = (id, currentRole) => {
        setEditId(id);
        setEditRole(currentRole);
    };

    const handleSaveRole = (id) => {
        setAccounts((prev) =>
            prev.map((acc) =>
                acc.accountId === id ? { ...acc, roleId: Number(editRole) } : acc
            )
        );
        setEditId(null);
    };

    // Delete
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setAccounts((prev) => prev.filter((acc) => acc.accountId !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    // Add
    const handleAddAccount = () => {
        const nextId = Math.max(...accounts.map((a) => a.accountId)) + 1;
        setAccounts((prev) => [
            ...prev,
            {
                ...newAccount,
                accountId: nextId,
                createdAt: new Date().toISOString(),
            },
        ]);
        setShowAdd(false);
        setNewAccount({
            accountname: "",
            password: "",
            fullName: "",
            dateOfBirth: "",
            gender: "Male",
            address: "",
            role_id: 4,
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="bg-blue-500 px-2 py-2 rounded-lg text-white text-2xl font-bold mb-4">Account Management</h2>
                <button
                    className="mb-4 px-6 py-3 bg-blue-600 text-white rounded"
                    onClick={() => setShowAdd((v) => !v)}
                >
                    {showAdd ? <MdCancel /> : <IoMdAddCircle />}
                </button>
                {showAdd && (
                    <div
                        className={`mb-6 bg-gray-100 p-4 rounded transition-all duration-500 ease-in-out transform ${showAdd ? 'opacity-100 scale-100 max-h-[1000px]' : 'opacity-0 scale-95 max-h-0 overflow-hidden'}`}
                        style={{ transitionProperty: 'opacity, transform, max-height' }}
                    >
                        <h3 className="font-semibold mb-2">Add New Account</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="border p-2"
                                placeholder="Account Name"
                                value={newAccount.accountname}
                                onChange={(e) =>
                                    setNewAccount((a) => ({ ...a, accountname: e.target.value }))
                                }
                            />
                            <input
                                className="border p-2"
                                placeholder="Password"
                                value={newAccount.password}
                                onChange={(e) =>
                                    setNewAccount((a) => ({ ...a, password: e.target.value }))
                                }
                            />
                            <input
                                className="border p-2"
                                placeholder="Full Name"
                                value={newAccount.fullName}
                                onChange={(e) =>
                                    setNewAccount((a) => ({ ...a, fullName: e.target.value }))
                                }
                            />
                            <input
                                className="border p-2"
                                type="date"
                                value={newAccount.dateOfBirth}
                                onChange={(e) =>
                                    setNewAccount((a) => ({ ...a, dateOfBirth: e.target.value }))
                                }
                            />
                            <select
                                className="border p-2"
                                value={newAccount.gender}
                                onChange={(e) =>
                                    setNewAccount((a) => ({ ...a, gender: e.target.value }))
                                }
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input
                                className="border p-2"
                                placeholder="Address"
                                value={newAccount.address}
                                onChange={(e) =>
                                    setNewAccount((a) => ({ ...a, address: e.target.value }))
                                }
                            />
                            <select
                                className="border p-2"
                                value={newAccount.role_id}
                                onChange={(e) =>
                                    setNewAccount((a) => ({ ...a, role_id: Number(e.target.value) }))
                                }
                            >
                                {roleOptions.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="mt-4 px-6 py-3 bg-green-600 text-white rounded"
                            onClick={handleAddAccount}
                        >
                            Add
                        </button>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 py-2 px-4 border">ID</th>
                                <th className="bg-gray-200 py-2 px-4 border">Account Name</th>
                                <th className="bg-gray-200 py-2 px-4 border">Full Name</th>
                                <th className="bg-gray-200 py-2 px-4 border">Date of Birth</th>
                                <th className="bg-gray-200 py-2 px-4 border">Gender</th>
                                <th className="bg-gray-200 py-2 px-4 border">Address</th>
                                <th className="bg-gray-200 py-2 px-4 border">Role</th>
                                <th className="bg-gray-200 py-2 px-4 border">Created At</th>
                                <th className="bg-gray-200 py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((acc) => (
                                <tr key={acc.accountId}>
                                    <td className="py-2 px-4 border">{acc.accountId}</td>
                                    <td className="py-2 px-4 border">{acc.accountname}</td>
                                    <td className="py-2 px-4 border">{acc.fullName}</td>
                                    <td className="py-2 px-4 border">{formatDateVN(acc.dateOfBirth)}</td>
                                    <td className="py-2 px-4 border">{acc.gender}</td>
                                    <td className="py-2 px-4 border">{acc.address}</td>
                                    <td className="py-2 px-4 border">
                                        {editId === acc.accountId ? (
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={editRole}
                                                    onChange={(e) => setEditRole(Number(e.target.value))}
                                                    className="border p-1 min-w-[90px] max-w-[120px] text-sm"
                                                >
                                                    {roleOptions.map((r) => (
                                                        <option key={r.id} value={r.id}>
                                                            {r.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded text-xs"
                                                    onClick={() => handleSaveRole(acc.accountId)}
                                                >
                                                    <FaSave />
                                                </button>
                                                <button
                                                    className="bg-gray-400 text-white px-4 py-2 rounded text-xs"
                                                    onClick={() => setEditId(null)}
                                                >
                                                    <MdCancel />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {roleOptions.find((r) => r.id === acc.roleId)?.name || acc.roleid}
                                            </>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border">{formatDateVN(acc.createdAt)}</td>
                                    <td className="py-2 px-4 border">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="bg-yellow-500 text-white px-6 py-3 rounded text-xs"
                                                onClick={() => handleEditRole(acc.accountId, acc.roleId)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-6 py-3 rounded text-xs"
                                                onClick={() => handleDelete(acc.accountId)}
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm
                        transition-all duration-300 ease-out
                        transform opacity-100 scale-100
                        animate-fadeInScale">
                        <h3 className="text-lg font-semibold mb-4">Delete Account Confirmation</h3>
                        <p className="mb-6">Are you sure you want to delete this account?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={confirmDelete}
                            >
                                <MdDelete />
                            </button>
                            <button
                                className="px-6 py-3 bg-gray-300 text-white rounded hover:bg-gray-400"
                                onClick={cancelDelete}
                            >
                                <MdCancel />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;