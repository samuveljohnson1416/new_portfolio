import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Award, 
  Code, 
  Briefcase, 
  LogOut, 
  Trash2, 
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { useAuth, useAuthenticatedFetch } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';
import type { Certificate, Skill, Experience } from '../types/admin';

type TabType = 'certificates' | 'skills' | 'experiences';

export default function AdminDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const { data, loading, refetch } = usePortfolioData();
  const authenticatedFetch = useAuthenticatedFetch();
  
  const [activeTab, setActiveTab] = useState<TabType>('certificates');
  const [showAddForm, setShowAddForm] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  const deleteItem = async (type: TabType, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const response = await authenticatedFetch(`/api/admin/${type}/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        refetch();
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const tabs = [
    { id: 'certificates' as TabType, label: 'Certificates', icon: Award, count: data.certificates.length },
    { id: 'skills' as TabType, label: 'Skills', icon: Code, count: data.skills.length },
    { id: 'experiences' as TabType, label: 'Experience', icon: Briefcase, count: data.experiences.length },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Portfolio Admin
            </h1>
            <p className="text-gray-400 mt-1">
              Welcome back, {user?.username}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 min-h-screen p-6">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 text-left">{tab.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeTab === tab.id ? 'bg-cyan-500/20' : 'bg-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold capitalize">
              Manage {activeTab}
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              <Plus size={16} />
              Add New
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {activeTab === 'certificates' && (
                <CertificatesTable 
                  certificates={data.certificates} 
                  onDelete={(id) => deleteItem('certificates', id)}
                />
              )}
              {activeTab === 'skills' && (
                <SkillsTable 
                  skills={data.skills} 
                  onDelete={(id) => deleteItem('skills', id)}
                />
              )}
              {activeTab === 'experiences' && (
                <ExperiencesTable 
                  experiences={data.experiences} 
                  onDelete={(id) => deleteItem('experiences', id)}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <AddItemModal
          type={activeTab}
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}

// Certificates Table Component
function CertificatesTable({ certificates, onDelete }: { 
  certificates: Certificate[], 
  onDelete: (id: string) => void 
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4 font-medium text-gray-300">Certificate</th>
              <th className="text-left p-4 font-medium text-gray-300">Issuer</th>
              <th className="text-left p-4 font-medium text-gray-300">Date</th>
              <th className="text-left p-4 font-medium text-gray-300">Category</th>
              <th className="text-right p-4 font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={cert.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white">{cert.title}</div>
                    {cert.description && (
                      <div className="text-sm text-gray-400 mt-1">{cert.description}</div>
                    )}
                  </div>
                </td>
                <td className="p-4 text-gray-300">{cert.issuer}</td>
                <td className="p-4 text-gray-300">
                  {new Date(cert.date).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                    {cert.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      onClick={() => onDelete(cert.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Skills Table Component
function SkillsTable({ skills, onDelete }: { 
  skills: Skill[], 
  onDelete: (id: string) => void 
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4 font-medium text-gray-300">Skill</th>
              <th className="text-left p-4 font-medium text-gray-300">Category</th>
              <th className="text-left p-4 font-medium text-gray-300">Level</th>
              <th className="text-left p-4 font-medium text-gray-300">Added</th>
              <th className="text-right p-4 font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <tr key={skill.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white">{skill.name}</div>
                    {skill.description && (
                      <div className="text-sm text-gray-400 mt-1">{skill.description}</div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm">
                    {skill.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-300">{skill.level}%</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">
                  {new Date(skill.dateAdded).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onDelete(skill.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Experiences Table Component
function ExperiencesTable({ experiences, onDelete }: { 
  experiences: Experience[], 
  onDelete: (id: string) => void 
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4 font-medium text-gray-300">Role</th>
              <th className="text-left p-4 font-medium text-gray-300">Company</th>
              <th className="text-left p-4 font-medium text-gray-300">Duration</th>
              <th className="text-left p-4 font-medium text-gray-300">Type</th>
              <th className="text-right p-4 font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp, index) => (
              <tr key={exp.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white">{exp.role}</div>
                    <div className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {exp.description}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{exp.company}</td>
                <td className="p-4 text-gray-300">{exp.duration}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    exp.type === 'work' ? 'bg-green-500/20 text-green-300' :
                    exp.type === 'project' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-orange-500/20 text-orange-300'
                  }`}>
                    {exp.type}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      onClick={() => onDelete(exp.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add Item Modal Component
function AddItemModal({ 
  type, 
  onClose, 
  onSuccess 
}: { 
  type: TabType,
  onClose: () => void,
  onSuccess: () => void
}) {
  const authenticatedFetch = useAuthenticatedFetch();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== '') {
          if (key === 'technologies' && Array.isArray(formData[key])) {
            formDataToSend.append(key, formData[key].join(','));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      const response = await authenticatedFetch(`/api/admin/${type}`, {
        method: 'POST',
        body: formDataToSend,
        headers: {}, // Remove Content-Type to let FormData set it
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item');
    } finally {
      setSubmitting(false);
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'certificates':
        return (
          <>
            <input
              type="text"
              placeholder="Certificate Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            />
            <input
              type="text"
              placeholder="Issuer"
              value={formData.issuer || ''}
              onChange={(e) => setFormData({...formData, issuer: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            />
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            />
            <input
              type="url"
              placeholder="Certificate Link (optional)"
              value={formData.link || ''}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Category (e.g., Programming, Design)"
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white h-24"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({...formData, image: e.target.files?.[0]})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white file:bg-cyan-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
            />
          </>
        );
      
      case 'skills':
        return (
          <>
            <input
              type="text"
              placeholder="Skill Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            />
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Programming">Programming</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Skill Level: {formData.level || 0}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.level || 0}
                onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                className="w-full"
              />
            </div>
            <textarea
              placeholder="Description (optional)"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white h-24"
            />
          </>
        );
      
      case 'experiences':
        return (
          <>
            <input
              type="text"
              placeholder="Role/Position"
              value={formData.role || ''}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            />
            <input
              type="text"
              placeholder="Company/Project Name"
              value={formData.company || ''}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., Jan 2024 - Present)"
              value={formData.duration || ''}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              required
            />
            <select
              value={formData.type || 'project'}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            >
              <option value="project">Project</option>
              <option value="work">Work</option>
              <option value="volunteer">Volunteer</option>
            </select>
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white h-24"
              required
            />
            <input
              type="text"
              placeholder="Technologies (comma-separated)"
              value={formData.technologies || ''}
              onChange={(e) => setFormData({...formData, technologies: e.target.value.split(',').map((t: string) => t.trim())})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            />
            <input
              type="url"
              placeholder="Link (optional)"
              value={formData.link || ''}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
            />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Add New {type.slice(0, -1)}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg px-4 py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </div>
              ) : (
                <>
                  <Save size={16} className="inline mr-2" />
                  Add {type.slice(0, -1)}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
