import { useState } from "react";

const initialAccounts = [
    {
        account_id: 1,
        accountname: "admin",
        password: "admin123",
        fullName: "Admin User",
        dateOfBirth: "1980-01-01",
        gender: "Male",
        address: "123 Main St",
        role_id: 1,
        created_at: "2025-06-04 02:41:27.000",
    },
    {
        account_id: 2,
        accountname: "john_doe",
        password: "password123",
        fullName: "John Doe",
        dateOfBirth: "1990-05-15",
        gender: "Male",
        address: "456 Elm St",
        role_id: 4,
        created_at: "2025-06-04 02:41:27.000",
    },
    {
        account_id: 3,
        accountname: "jane_smith",
        password: "password456",
        fullName: "Jane Smith",
        dateOfBirth: "1985-08-22",
        gender: "Female",
        address: "789 Oak St",
        role_id: 3,
        created_at: "2025-06-04 02:41:27.000",
    },
    {
        account_id: 4,
        accountname: "emma_jones",
        password: "pass789",
        fullName: "Emma Jones",
        dateOfBirth: "1987-02-14",
        gender: "Female",
        address: "123 Maple St",
        role_id: 3,
        created_at: "2025-06-04 02:41:27.000",
    },
    {
        account_id: 5,
        accountname: "michael_lee",
        password: "pass321",
        fullName: "Michael Lee",
        dateOfBirth: "1975-09-30",
        gender: "Male",
        address: "456 Birch St",
        role_id: 2,
        created_at: "2025-06-04 02:41:27.000",
    },
    {
        account_id: 6,
        accountname: "test001",
        password: "123123123",
        fullName: "Test 001",
        dateOfBirth: "2009-01-01",
        gender: "Female",
        address: "HCM",
        role_id: 4,
        created_at: "2025-06-24 02:56:35.647",
    },
    {
        account_id: 7,
        accountname: "test002",
        password: "123123123",
        fullName: "Test002",
        dateOfBirth: "2017-05-08",
        gender: "Female",
        address: "HN",
        role_id: 4,
        created_at: "2025-06-24 05:26:55.793",
    },
    {
        account_id: 8,
        accountname: "test003",
        password: "123123",
        fullName: "Test 003",
        dateOfBirth: "1111-11-11",
        gender: "Male",
        address: "ASB",
        role_id: 4,
        created_at: "2025-06-24 05:34:22.993",
    },
    {
        account_id: 9,
        accountname: "test004",
        password: "123123",
        fullName: "Test 004",
        dateOfBirth: "1111-11-11",
        gender: "Male",
        address: "BCD",
        role_id: 4,
        created_at: "2025-06-24 05:34:46.817",
    },
    {
        account_id: 10,
        accountname: "test005",
        password: "123123",
        fullName: "Test 005",
        dateOfBirth: "2222-02-22",
        gender: "Male",
        address: "QWEEWQ",
        role_id: 4,
        created_at: "2025-06-24 05:42:08.000",
    },
    {
        account_id: 11,
        accountname: "test006",
        password: "123123",
        fullName: "HCMASD;l",
        dateOfBirth: "2312-12-31",
        gender: "Male",
        address: "111",
        role_id: 4,
        created_at: "2025-06-24 14:28:26.907",
    },
    {
        account_id: 12,
        accountname: "tuilavy",
        password: "123123",
        fullName: "Tui La Vy",
        dateOfBirth: "2025-06-03",
        gender: "Male",
        address: "Ho Chi Minh",
        role_id: 4,
        created_at: "2025-06-25 00:36:04.420",
    },
    {
        account_id: 13,
        accountname: "thao123",
        password: "123456",
        fullName: "123455",
        dateOfBirth: "2344-11-12",
        gender: "Male",
        address: "dfafdadd",
        role_id: 4,
        created_at: "2025-06-25 02:59:04.853",
    },
    {
        account_id: 14,
        accountname: "test008",
        password: "123123",
        fullName: "ABC",
        dateOfBirth: "2025-06-01",
        gender: "Male",
        address: "HCM",
        role_id: 4,
        created_at: "2025-06-25 04:05:46.037",
    },
];

const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Staff" },
    { id: 3, name: "Consultant" },
    { id: 4, name: "Member" },
];

const Account = () => {
    const [accounts, setAccounts] = useState(initialAccounts);
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

    // Edit role
    const handleEditRole = (id, currentRole) => {
        setEditId(id);
        setEditRole(currentRole);
    };

    const handleSaveRole = (id) => {
        setAccounts((prev) =>
            prev.map((acc) =>
                acc.account_id === id ? { ...acc, role_id: Number(editRole) } : acc
            )
        );
        setEditId(null);
    };

    // Delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this account?")) {
            setAccounts((prev) => prev.filter((acc) => acc.account_id !== id));
        }
    };

    // Add
    const handleAddAccount = () => {
        const nextId = Math.max(...accounts.map((a) => a.account_id)) + 1;
        setAccounts((prev) => [
            ...prev,
            {
                ...newAccount,
                account_id: nextId,
                created_at: new Date().toISOString(),
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
                            <tr key={acc.account_id}>
                                <td className="py-2 px-4 border">{acc.account_id}</td>
                                <td className="py-2 px-4 border">{acc.accountname}</td>
                                <td className="py-2 px-4 border">{acc.fullName}</td>
                                <td className="py-2 px-4 border">{acc.dateOfBirth}</td>
                                <td className="py-2 px-4 border">{acc.gender}</td>
                                <td className="py-2 px-4 border">{acc.address}</td>
                                <td className="py-2 px-4 border">
                                    {editId === acc.account_id ? (
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
                                    ) : (
                                        roleOptions.find((r) => r.id === acc.role_id)?.name || acc.role_id
                                    )}
                                </td>
                                <td className="py-2 px-4 border">{acc.created_at}</td>
                                <td className="py-2 px-4 border">
                                    {editId === acc.account_id ? (
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleSaveRole(acc.account_id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => handleEditRole(acc.account_id, acc.role_id)}
                                        >
                                            Edit Role
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(acc.account_id)}
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