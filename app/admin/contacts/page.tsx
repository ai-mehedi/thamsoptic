"use client";
import { useEffect, useState } from 'react';
import { Search, Mail, Phone, MapPin, MessageSquare, Check, Clock, Archive } from 'lucide-react';

interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    postcode: string;
    message: string | null;
    status: string;
    createdAt: string;
}

const statuses = ['NEW', 'CONTACTED', 'RESOLVED', 'ARCHIVED'];

const statusColors: Record<string, string> = {
    NEW: 'bg-amber-100 text-amber-700 border-amber-200',
    CONTACTED: 'bg-blue-100 text-blue-700 border-blue-200',
    RESOLVED: 'bg-green-100 text-green-700 border-green-200',
    ARCHIVED: 'bg-slate-100 text-slate-600 border-slate-200',
};

const statusIcons: Record<string, typeof Clock> = {
    NEW: Clock,
    CONTACTED: Mail,
    RESOLVED: Check,
    ARCHIVED: Archive,
};

export default function AdminContacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    async function fetchContacts() {
        try {
            const response = await fetch('/api/admin/contacts');
            const data = await response.json();
            setContacts(data.contacts || []);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(contactId: string, newStatus: string) {
        try {
            const response = await fetch('/api/admin/contacts', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: contactId, status: newStatus }),
            });

            if (response.ok) {
                setContacts(contacts.map(c => c.id === contactId ? { ...c, status: newStatus } : c));
                if (selectedContact?.id === contactId) {
                    setSelectedContact({ ...selectedContact, status: newStatus });
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const filteredContacts = contacts.filter(contact => {
        const matchesFilter = filter === 'ALL' || contact.status === filter;
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const matchesSearch = search === '' ||
            fullName.includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase()) ||
            contact.postcode.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Contact Requests</h1>
                <p className="text-slate-600">Manage enquiries from customers in non-covered areas</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilter('ALL')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'ALL' ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            All ({contacts.length})
                        </button>
                        {statuses.map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                                {status} ({contacts.filter(c => c.status === status).length})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contacts List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading contacts...</div>
                ) : filteredContacts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No contact requests found</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredContacts.map((contact) => {
                            const StatusIcon = statusIcons[contact.status] || Clock;
                            return (
                                <div
                                    key={contact.id}
                                    className="p-4 hover:bg-slate-50 cursor-pointer"
                                    onClick={() => setSelectedContact(contact)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                                {contact.firstName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{contact.firstName} {contact.lastName}</h3>
                                                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" /> {contact.email}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {contact.postcode}
                                                    </span>
                                                </div>
                                                {contact.message && (
                                                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{contact.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColors[contact.status]}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {contact.status}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Contact Detail Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Contact Request</h2>
                                <p className="text-sm text-slate-500">Received on {new Date(selectedContact.createdAt).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setSelectedContact(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status Update */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Update Status</label>
                                <div className="flex gap-2 flex-wrap">
                                    {statuses.map(status => {
                                        const StatusIcon = statusIcons[status];
                                        return (
                                            <button
                                                key={status}
                                                onClick={() => updateStatus(selectedContact.id, status)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors flex items-center gap-1 ${
                                                    selectedContact.status === status
                                                        ? statusColors[status]
                                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                <StatusIcon className="w-4 h-4" />
                                                {status}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                                <h3 className="font-semibold text-slate-900">Contact Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-500">Name:</span>
                                        <span className="ml-2 font-medium">{selectedContact.firstName} {selectedContact.lastName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <a href={`mailto:${selectedContact.email}`} className="text-blue-800 hover:underline">{selectedContact.email}</a>
                                    </div>
                                    {selectedContact.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <a href={`tel:${selectedContact.phone}`} className="text-blue-800 hover:underline">{selectedContact.phone}</a>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <span>{selectedContact.postcode}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            {selectedContact.message && (
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" /> Message
                                    </h3>
                                    <p className="text-slate-600 bg-slate-50 rounded-lg p-4 text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                                </div>
                            )}

                            {/* Interest Note */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <p className="text-sm text-amber-800">
                                    <strong>Interest Registration:</strong> This customer is interested in broadband service for postcode <strong>{selectedContact.postcode}</strong>, which is not currently in our coverage area.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-slate-200">
                                <a
                                    href={`mailto:${selectedContact.email}?subject=ABStation - Coverage Enquiry for ${selectedContact.postcode}`}
                                    className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-xl font-semibold text-center transition-colors"
                                >
                                    Send Email
                                </a>
                                {selectedContact.phone && (
                                    <a
                                        href={`tel:${selectedContact.phone}`}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-center transition-colors"
                                    >
                                        Call Customer
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
