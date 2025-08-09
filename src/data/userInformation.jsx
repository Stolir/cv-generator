export const defaultUserData = {
  contact: {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1 234 567 890',
    email: 'john.doe@example.com',
    address: {
      city: 'New York',
      country: 'USA',
      postCode: '10001'
    }
  },
  experience: [
    {
      jobTitle: 'Frontend Developer',
      company: 'TechCorp',
      startDate: '2021-01',
      endDate: '2023-06',
      description: 'Developed user interfaces using React and optimized performance.'
    }
  ],
  education: [
    {
      degree: 'B.Sc. Computer Science',
      institution: 'Example University',
      startDate: '2016-09',
      endDate: '2020-06',
      grade: 'First Class Honours'
    }
  ],
  skills: [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'React', level: 'Intermediate' }
  ],
  summary: 'Enthusiastic software developer with 3+ years of experience.',
  other: {
    languages: ['English', 'Spanish'],
    certifications: ['AWS Certified Solutions Architect']
  }
};
