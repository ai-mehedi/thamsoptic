"use client";
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Check, X, Star } from 'lucide-react';

interface Package {
    id: string;
    name: string;
    speed: string;
    price: number;
    description: string;
    features: string[];
    technology: 'FTTP' | 'FTTC' | 'SOGEA' | 'Copper';
    isPopular: boolean;
    isActive: boolean;
    sortOrder: number;
}

export default function AdminPackages() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const emptyPackage: Omit<Package, 'id'> = {
        name: '', speed: '', price: 0, description: '', features: [], technology: 'FTTC', isPopular: false, isActive: true, sortOrder: 0
    };

    const [formData, setFormData] = useState<Omit<Package, 'id'>>(emptyPackage);
    const [featuresInput, setFeaturesInput] = useState('');

    useEffect(() => { fetchPackages(); }, []);

    async function fetchPackages() {
        try {
            const response = await fetch('/api/admin/packages');
            const data = await response.json();
            setPackages(data.packages || []);
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setFormData(emptyPackage);
        setFeaturesInput('');
        setIsCreating(true);
        setEditingPackage(null);
    }

    function openEdit(pkg: Package) {
        setFormData(pkg);
        setFeaturesInput(pkg.features.join('\n'));
        setEditingPackage(pkg);
        setIsCreating(false);
    }

    function closeModal() {
        setIsCreating(false);
        setEditingPackage(null);
        setFormData(emptyPackage);
        setFeaturesInput('');
    }

    async function handleSave() {
        const features = featuresInput.split('\n').map(f => f.trim()).filter(f => f);
        const data = { ...formData, features };

        try {
            const response = await fetch('/api/admin/packages', {
                method: editingPackage ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPackage ? { ...data, id: editingPackage.id } : data),
            });

            if (response.ok) {
                fetchPackages();
                closeModal();
            }
        } catch (error) {
            console.error('Error saving package:', error);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this package?')) return;

        try {
            const response = await fetch(`/api/admin/packages?id=${id}`, { method: 'DELETE' });
            if (response.ok) fetchPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Packages</h1>
                    <p className="text-slate-600">Manage broadband packages</p>
                </div>
                <button onClick={openCreate} className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Package
                </button>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-8 text-slate-500">Loading packages...</div>
                ) : packages.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-slate-500">No packages found</div>
                ) : (
                    packages.map((pkg) => (
                        <div key={pkg.id} className={`bg-white rounded-xl border ${pkg.isPopular ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200'} p-6`}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg text-slate-900">{pkg.name}</h3>
                                        {pkg.isPopular && <Star className="w-4 h-4 text-amber-500" fill="currentColor" />}
                                    </div>
                                    <p className="text-slate-600">{pkg.speed}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{pkg.technology}</span>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {pkg.isActive ? 'Active' : 'Inactive'}
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-slate-900 mb-2">£{pkg.price.toFixed(2)}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                            <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>

                            <ul className="space-y-1 mb-4">
                                {pkg.features.slice(0, 4).map((feature, i) => (
                                    <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-600" /> {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex gap-2 pt-4 border-t border-slate-100">
                                <button onClick={() => openEdit(pkg)} className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                                    <Edit className="w-4 h-4" /> Edit
                                </button>
                                <button onClick={() => handleDelete(pkg.id)} className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit/Create Modal */}
            {(isCreating || editingPackage) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{isCreating ? 'Create Package' : 'Edit Package'}</h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Speed</label>
                                    <input type="text" placeholder="500 Mbps" value={formData.speed} onChange={(e) => setFormData({...formData, speed: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (£/mo)</label>
                                    <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-200 rounded-lg" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Technology</label>
                                    <select value={formData.technology} onChange={(e) => setFormData({...formData, technology: e.target.value as Package['technology']})} className="w-full px-3 py-2 border border-slate-200 rounded-lg">
                                        <option value="FTTP">FTTP (Full Fibre)</option>
                                        <option value="FTTC">FTTC (Fibre to Cabinet)</option>
                                        <option value="SOGEA">SOGEA</option>
                                        <option value="Copper">Copper</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Features (one per line)</label>
                                <textarea rows={4} value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none" placeholder="Unlimited downloads&#10;WiFi 6 router included&#10;Price lock guarantee" />
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.isPopular} onChange={(e) => setFormData({...formData, isPopular: e.target.checked})} className="w-4 h-4 text-blue-800" />
                                    <span className="text-sm">Popular</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 text-blue-800" />
                                    <span className="text-sm">Active</span>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                                <input type="number" value={formData.sortOrder} onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-slate-200 rounded-lg" />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-200 flex gap-3">
                            <button onClick={closeModal} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">Cancel</button>
                            <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900">Save Package</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
