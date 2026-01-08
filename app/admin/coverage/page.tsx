"use client";
import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, MapPin, Package } from 'lucide-react';

interface CoverageArea {
    id: string;
    postcodePrefix: string;
    areaName: string;
    isActive: boolean;
    packages: { id: string; name: string; speed: string; price: number }[];
}

interface AvailablePackage {
    id: string;
    name: string;
    speed: string;
    price: number;
}

export default function AdminCoverage() {
    const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>([]);
    const [availablePackages, setAvailablePackages] = useState<AvailablePackage[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [editingArea, setEditingArea] = useState<CoverageArea | null>(null);

    const [formData, setFormData] = useState({
        postcodePrefix: '',
        areaName: '',
        isActive: true,
        packageIds: [] as string[],
    });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [coverageRes, packagesRes] = await Promise.all([
                fetch('/api/admin/coverage'),
                fetch('/api/admin/packages'),
            ]);
            const coverageData = await coverageRes.json();
            const packagesData = await packagesRes.json();
            setCoverageAreas(coverageData.coverageAreas || []);
            setAvailablePackages(packagesData.packages || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setFormData({ postcodePrefix: '', areaName: '', isActive: true, packageIds: [] });
        setIsCreating(true);
        setEditingArea(null);
    }

    function openEdit(area: CoverageArea) {
        setFormData({
            postcodePrefix: area.postcodePrefix,
            areaName: area.areaName,
            isActive: area.isActive,
            packageIds: area.packages.map(p => p.id),
        });
        setEditingArea(area);
        setIsCreating(false);
    }

    function closeModal() {
        setIsCreating(false);
        setEditingArea(null);
        setFormData({ postcodePrefix: '', areaName: '', isActive: true, packageIds: [] });
    }

    function togglePackage(packageId: string) {
        setFormData(prev => ({
            ...prev,
            packageIds: prev.packageIds.includes(packageId)
                ? prev.packageIds.filter(id => id !== packageId)
                : [...prev.packageIds, packageId],
        }));
    }

    async function handleSave() {
        try {
            const response = await fetch('/api/admin/coverage', {
                method: editingArea ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingArea ? { ...formData, id: editingArea.id } : formData),
            });

            if (response.ok) {
                fetchData();
                closeModal();
            }
        } catch (error) {
            console.error('Error saving coverage area:', error);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this coverage area?')) return;

        try {
            const response = await fetch(`/api/admin/coverage?id=${id}`, { method: 'DELETE' });
            if (response.ok) fetchData();
        } catch (error) {
            console.error('Error deleting coverage area:', error);
        }
    }

    const filteredAreas = coverageAreas.filter(area =>
        area.postcodePrefix.toLowerCase().includes(search.toLowerCase()) ||
        area.areaName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Coverage Areas</h1>
                    <p className="text-slate-600">Manage postcode coverage and package availability</p>
                </div>
                <button onClick={openCreate} className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Coverage Area
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by postcode or area name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Coverage Areas Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-500">Loading coverage areas...</div>
                ) : filteredAreas.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No coverage areas found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Postcode</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Area Name</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Packages</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredAreas.map((area) => (
                                    <tr key={area.id} className="hover:bg-slate-50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                <span className="font-semibold text-slate-900">{area.postcodePrefix}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-slate-700">{area.areaName}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {area.packages.slice(0, 3).map(pkg => (
                                                    <span key={pkg.id} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                                                        {pkg.name}
                                                    </span>
                                                ))}
                                                {area.packages.length > 3 && (
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                                                        +{area.packages.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${area.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {area.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => openEdit(area)} className="p-2 hover:bg-slate-100 rounded-lg">
                                                    <Edit className="w-4 h-4 text-slate-600" />
                                                </button>
                                                <button onClick={() => handleDelete(area.id)} className="p-2 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {(isCreating || editingArea) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{isCreating ? 'Add Coverage Area' : 'Edit Coverage Area'}</h2>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Postcode Prefix</label>
                                <input
                                    type="text"
                                    placeholder="e.g. SW1, E1, SE1"
                                    value={formData.postcodePrefix}
                                    onChange={(e) => setFormData({ ...formData, postcodePrefix: e.target.value.toUpperCase() })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                                <p className="text-xs text-slate-500 mt-1">Enter the postcode prefix (outward code)</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Area Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Westminster, Shoreditch"
                                    value={formData.areaName}
                                    onChange={(e) => setFormData({ ...formData, areaName: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Available Packages</label>
                                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3">
                                    {availablePackages.map(pkg => (
                                        <label key={pkg.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.packageIds.includes(pkg.id)}
                                                onChange={() => togglePackage(pkg.id)}
                                                className="w-4 h-4 text-blue-800"
                                            />
                                            <Package className="w-4 h-4 text-slate-400" />
                                            <div className="flex-1">
                                                <span className="font-medium text-slate-900">{pkg.name}</span>
                                                <span className="text-slate-500 text-sm ml-2">{pkg.speed}</span>
                                            </div>
                                            <span className="text-sm text-slate-600">£{pkg.price.toFixed(2)}/mo</span>
                                        </label>
                                    ))}
                                    {availablePackages.length === 0 && (
                                        <p className="text-sm text-slate-500 text-center py-2">No packages available</p>
                                    )}
                                </div>
                            </div>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4 text-blue-800"
                                />
                                <span className="text-sm">Active (coverage is available)</span>
                            </label>
                        </div>

                        <div className="p-6 border-t border-slate-200 flex gap-3">
                            <button onClick={closeModal} className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">Cancel</button>
                            <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-800 text-white rounded-lg font-medium hover:bg-blue-900">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
