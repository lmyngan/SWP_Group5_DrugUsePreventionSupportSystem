import { useState, useEffect } from "react";
import { getFullAccount } from "../service/api";

const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Staff" },
    { id: 3, name: "Consultant" },
    { id: 4, name: "Member" },
];

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
        if (window.confirm("Are you sure you want to delete this account?")) {
            setAccounts((prev) => prev.filter((acc) => acc.accountId !== id));
        }
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
            <h2 className="text-2xl font-bold mb-4">Account Management</h2>
            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setShowAdd((v) => !v)}
            >
                {showAdd ? "Cancel" : "Add Account"}
            </button>
            {showAdd && (
                <div className="mb-6 bg-gray-100 p-4 rounded">
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
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
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
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Account Name</th>
                            <th className="py-2 px-4 border">Full Name</th>
                            <th className="py-2 px-4 border">Date of Birth</th>
                            <th className="py-2 px-4 border">Gender</th>
                            <th className="py-2 px-4 border">Address</th>
                            <th className="py-2 px-4 border">Role</th>
                            <th className="py-2 px-4 border">Created At</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((acc) => (
                            <tr key={acc.accountId}>
                                <td className="py-2 px-4 border">{acc.accountId}</td>
                                <td className="py-2 px-4 border">{acc.accountname}</td>
                                <td className="py-2 px-4 border">{acc.fullName}</td>
                                <td className="py-2 px-4 border">{acc.dateOfBirth.split('T')[0]}</td>
                                <td className="py-2 px-4 border">{acc.gender}</td>
                                <td className="py-2 px-4 border">{acc.address}</td>
                                <td className="py-2 px-4 border">
                                    {editId === acc.accountId ? (
                                        <>
                                            <select
                                                value={editRole}
                                                onChange={(e) => setEditRole(Number(e.target.value))}
                                                className="border p-1"
                                            >
                                                {roleOptions.map((r) => (
                                                    <option key={r.id} value={r.id}>
                                                        {r.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                                                onClick={() => handleSaveRole(acc.accountId)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-gray-400 text-white px-2 py-1 rounded ml-2"
                                                onClick={() => setEditId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {roleOptions.find((r) => r.id === acc.roleId)?.name || acc.roleid}
                                            <button
                                                className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                                                onClick={() => handleEditRole(acc.accountId, acc.roleId)}
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td className="py-2 px-4 border">{acc.createdAt ? acc.createdAt.split('T')[0] : ''}</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(acc.accountId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Account;