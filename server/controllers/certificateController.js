const Certificate = require('../models/Certificate');

const sampleCertificates = [
  {
    _id: 'cert-1',
    title: 'Cloud Computing Certification',
    issuer: 'NPTEL (IIT Kharagpur / MoE)',
    issueDate: '2024',
    credentialUrl: 'https://nptel.ac.in/noc',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    order: 1,
  },
];

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
    if (!certificates || certificates.length === 0) {
      return res.json({ success: true, count: sampleCertificates.length, data: sampleCertificates });
    }
    res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error) {
    res.json({ success: true, count: sampleCertificates.length, data: sampleCertificates });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { title, issuer, issueDate, credentialUrl, image, order } = req.body;
    const certificate = new Certificate({ title, issuer, issueDate, credentialUrl, image, order });
    const createdCert = await certificate.save();
    res.status(201).json({ success: true, data: createdCert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (certificate) {
      certificate.title = req.body.title || certificate.title;
      certificate.issuer = req.body.issuer || certificate.issuer;
      certificate.issueDate = req.body.issueDate || certificate.issueDate;
      certificate.credentialUrl = req.body.credentialUrl !== undefined ? req.body.credentialUrl : certificate.credentialUrl;
      certificate.image = req.body.image !== undefined ? req.body.image : certificate.image;
      certificate.order = req.body.order !== undefined ? req.body.order : certificate.order;

      const updatedCert = await certificate.save();
      return res.json({ success: true, data: updatedCert });
    }
    res.status(404).json({ success: false, message: 'Certificate not found' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (certificate) {
      await certificate.deleteOne();
      return res.json({ success: true, message: 'Certificate removed' });
    }
    res.status(404).json({ success: false, message: 'Certificate not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
