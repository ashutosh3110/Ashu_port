import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2, Cpu, Briefcase, Award, BookOpen, Mail, Eye, Plus, Trash2, Edit, LogOut, Home, X, Save, Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import GlassCard from '../components/common/GlassCard';
import API from '../services/api';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects');
  const [stats, setStats] = useState({ projects: 0, blogs: 0, skills: 0, messages: 0, visitors: 0 });

  // Data Collections
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchStats();
    fetchAllData();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/analytics/stats');
      if (res.data.success) setStats(res.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAllData = async () => {
    try {
      const [pRes, sRes, eRes, cRes, bRes, mRes] = await Promise.all([
        API.get('/projects'),
        API.get('/skills'),
        API.get('/experience'),
        API.get('/certificates'),
        API.get('/blogs'),
        API.get('/messages'),
      ]);
      if (pRes.data.success) setProjects(pRes.data.data);
      if (sRes.data.success) setSkills(sRes.data.data);
      if (eRes.data.success) setExperiences(eRes.data.data);
      if (cRes.data.success) setCertificates(cRes.data.data);
      if (bRes.data.success) setBlogs(bRes.data.data);
      if (mRes.data.success) setMessages(mRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/');
  };

  // Open Modal for Create or Edit
  const openModal = (item = null) => {
    setEditingItem(item);
    if (activeTab === 'projects') {
      setFormData(item || { title: '', description: '', category: 'Full Stack', technologies: '', githubLink: '', liveLink: '', image: '', featured: false });
    } else if (activeTab === 'skills') {
      setFormData(item || { name: '', category: 'Frontend', proficiency: 90, icon: 'SiReact' });
    } else if (activeTab === 'experience') {
      setFormData(item || { title: '', company: '', location: '', type: 'Full-Time', startDate: '', endDate: 'Present', description: '', highlights: '' });
    } else if (activeTab === 'certificates') {
      setFormData(item || { title: '', issuer: '', issueDate: '', credentialUrl: '', image: '' });
    } else if (activeTab === 'blogs') {
      setFormData(item || { title: '', slug: '', excerpt: '', content: '', category: 'Engineering', tags: '', readTime: '5 min read', coverImage: '' });
    }
    setIsModalOpen(true);
  };

  // Handle Form Submit for CRUD
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = `/${activeTab}`;
      if (activeTab === 'blogs') endpoint = '/blogs';

      if (editingItem) {
        await API.put(`${endpoint}/${editingItem._id}`, formData);
        toast.success(`${activeTab.slice(0, -1)} updated successfully!`);
      } else {
        await API.post(endpoint, formData);
        toast.success(`New ${activeTab.slice(0, -1)} added successfully!`);
      }

      setIsModalOpen(false);
      fetchAllData();
      fetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  // Delete Item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await API.delete(`/${activeTab}/${id}`);
      toast.success('Deleted successfully');
      fetchAllData();
      fetchStats();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  // Profile State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Ashutosh Banke',
    avatar: user?.avatar || '',
    bio: user?.bio || 'Full Stack MERN Developer',
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || 'Ashutosh Banke',
        avatar: user.avatar || '',
        bio: user.bio || 'Full Stack MERN Developer',
      });
    }
  }, [user]);

  const [uploading, setUploading] = useState(false);
  const [modalUploading, setModalUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setUploading(true);
    try {
      const res = await API.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setProfileForm((prev) => ({ ...prev, avatar: res.data.imageUrl }));
        toast.success('Photo uploaded and stored on server successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleModalFileUpload = async (e, fieldKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    setModalUploading(true);
    try {
      const res = await API.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, [fieldKey]: res.data.imageUrl }));
        toast.success('Image uploaded and stored on server!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'File upload failed');
    } finally {
      setModalUploading(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put('/auth/profile', profileForm);
      if (res.data.success) {
        toast.success('Profile & Avatar updated successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>Admin Dashboard</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                JWT Authenticated
              </span>
            </h1>
            <p className="text-xs text-slate-400">Welcome, {user?.name || 'Admin'} ({user?.email})</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white flex items-center space-x-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Main Site</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="glass-card p-4 space-y-1">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Projects</span>
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.projects}</div>
          </div>
          <div className="glass-card p-4 space-y-1">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Skills</span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.skills}</div>
          </div>
          <div className="glass-card p-4 space-y-1">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Articles</span>
              <BookOpen className="w-4 h-4 text-pink-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.blogs}</div>
          </div>
          <div className="glass-card p-4 space-y-1">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Messages</span>
              <Mail className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.messages}</div>
          </div>
          <div className="glass-card p-4 space-y-1 col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Visitors</span>
              <Eye className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.visitors}</div>
          </div>
        </div>

        {/* Tabs Bar & Add Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['projects', 'skills', 'experience', 'certificates', 'blogs', 'messages', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab === 'profile' ? 'Profile & Avatar' : tab}
              </button>
            ))}
          </div>

          {activeTab !== 'messages' && activeTab !== 'profile' && (
            <button
              onClick={() => openModal()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New {activeTab.slice(0, -1)}</span>
            </button>
          )}
        </div>

        {/* Data List Content */}
        <GlassCard className="p-6">
          {activeTab === 'projects' && (
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    <p className="text-xs text-indigo-400">{p.category} • {p.technologies?.join(', ')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => openModal(p)} className="p-2 text-indigo-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-2 text-rose-400 hover:text-rose-300"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((s) => (
                <div key={s._id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{s.name}</div>
                    <div className="text-[10px] text-slate-400">{s.category} ({s.proficiency}%)</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button onClick={() => openModal(s)} className="p-1.5 text-indigo-400"><Edit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(s._id)} className="p-1.5 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{exp.title} - {exp.company}</h4>
                    <p className="text-xs text-slate-400">{exp.startDate} - {exp.endDate} ({exp.type})</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => openModal(exp)} className="p-2 text-indigo-400"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(exp._id)} className="p-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certificates.map((cert) => (
                <div key={cert._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                    <p className="text-xs text-indigo-400">{cert.issuer} • {cert.issueDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => openModal(cert)} className="p-2 text-indigo-400"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(cert._id)} className="p-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-3">
              {blogs.map((b) => (
                <div key={b._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{b.title}</h4>
                    <p className="text-xs text-slate-400">{b.category} • {b.readTime}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => openModal(b)} className="p-2 text-indigo-400"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(b._id)} className="p-2 text-rose-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m._id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">{m.name} ({m.email})</span>
                    <button onClick={() => handleDelete(m._id)} className="text-rose-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="text-sm font-semibold text-white">{m.subject}</div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg">{m.message}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Admin Profile & Avatar Settings</h3>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-lg flex items-center justify-center bg-slate-900">
                  {profileForm.avatar ? (
                    <img
                      src={profileForm.avatar}
                      alt="Admin Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white font-extrabold text-2xl">
                      <span>AB</span>
                      <span className="text-[9px] font-normal text-indigo-200 mt-0.5">No Image</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-base font-bold text-white">{profileForm.name}</h4>
                  <p className="text-xs text-indigo-400 font-medium">{profileForm.bio}</p>
                  <p className="text-[10px] text-slate-500">Live preview of your profile avatar</p>
                </div>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Direct File Upload Option */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Upload Profile Photo Directly from PC
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar-file-input"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="avatar-file-input"
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center space-x-2 cursor-pointer transition-all duration-200 shadow-md shadow-indigo-500/20"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? 'Uploading Photo...' : 'Choose Image File from PC'}</span>
                    </label>
                    <span className="text-[10px] text-slate-400">
                      Supports JPG, PNG, WEBP, GIF (Max 5MB)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Profile Image URL (Avatar)</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or /profile.jpg"
                    value={profileForm.avatar}
                    onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Auto-filled when you upload a file above, or enter an image URL directly.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bio / Title</label>
                  <input
                    type="text"
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Profile & Avatar</span>
                </button>
              </form>
            </div>
          )}
        </GlassCard>

        {/* Dynamic Modal for Create / Edit */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass-card max-w-xl w-full p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                <h3 className="text-xl font-bold text-white capitalize">{editingItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h3>

                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {Object.keys(formData).map((key) => {
                    if (key === '_id' || key === 'createdAt' || key === 'updatedAt' || key === '__v') return null;
                    const isImageField = key === 'image' || key === 'coverImage' || key === 'avatar';
                    return (
                      <div key={key} className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-300 capitalize">{key}</label>
                        {isImageField ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={formData[key] || ''}
                                placeholder="Upload image below or enter URL"
                                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                              />
                              <label className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-all shrink-0">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{modalUploading ? 'Uploading...' : 'Upload Image'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleModalFileUpload(e, key)}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            {formData[key] && (
                              <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-800 relative bg-slate-900">
                                <img src={formData[key]} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={formData[key] || ''}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                          />
                        )}
                      </div>
                    );
                  })}
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                    <Save className="w-4 h-4" />
                    <span>Save {activeTab.slice(0, -1)}</span>
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
