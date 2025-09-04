import { usePortfolioData, useCertificates, useSkills, useExperiences } from '../hooks/usePortfolioData';

/**
 * Dynamic Certificates Component
 * Integrates with your existing Resume component
 */
export function DynamicCertificates() {
  const { certificates, loading, error } = useCertificates();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-4">
        Error loading certificates: {error}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-white font-medium">{cert.title}</h4>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                View →
              </a>
            )}
          </div>
          <p className="text-gray-300 text-sm mb-1">{cert.issuer}</p>
          <p className="text-gray-400 text-xs mb-2">
            {new Date(cert.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </p>
          {cert.description && (
            <p className="text-gray-400 text-xs">{cert.description}</p>
          )}
          {cert.category && (
            <span className="inline-block mt-2 px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
              {cert.category}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Dynamic Skills Component
 * Can be integrated into your About component
 */
export function DynamicSkills({ category, limit }: { category?: string, limit?: number }) {
  const { skills, loading, error, getSkillsByCategory, getTopSkills } = useSkills();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-4">
        Error loading skills: {error}
      </div>
    );
  }

  const displaySkills = category 
    ? getSkillsByCategory(category) 
    : limit 
    ? getTopSkills(limit)
    : skills;

  return (
    <div className="space-y-4">
      {displaySkills.map((skill) => (
        <div key={skill.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">{skill.name}</span>
            <span className="text-cyan-400 text-sm">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${skill.level}%` }}
            />
          </div>
          {skill.description && (
            <p className="text-gray-400 text-xs">{skill.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Dynamic Experience Component
 * Can be integrated into your Resume component
 */
export function DynamicExperience({ type }: { type?: 'work' | 'project' | 'volunteer' }) {
  const { experiences, loading, error, getExperiencesByType } = useExperiences();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-4">
        Error loading experience: {error}
      </div>
    );
  }

  const displayExperiences = type ? getExperiencesByType(type) : experiences;

  return (
    <div className="space-y-6">
      {displayExperiences.map((exp) => (
        <div
          key={exp.id}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-white font-semibold text-lg">{exp.role}</h3>
              <p className="text-cyan-400">{exp.company}</p>
              <p className="text-gray-400 text-sm">{exp.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${
                exp.type === 'work' ? 'bg-green-500/20 text-green-300' :
                exp.type === 'project' ? 'bg-blue-500/20 text-blue-300' :
                'bg-orange-500/20 text-orange-300'
              }`}>
                {exp.type}
              </span>
              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  →
                </a>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 mb-3">{exp.description}</p>
          
          {exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Portfolio Data Stats Component
 * Shows a summary of your portfolio data
 */
export function PortfolioStats() {
  const { data, loading } = usePortfolioData();

  if (loading) {
    return null;
  }

  const stats = [
    { label: 'Certificates', value: data.certificates.length, color: 'text-yellow-400' },
    { label: 'Skills', value: data.skills.length, color: 'text-cyan-400' },
    { label: 'Experiences', value: data.experiences.length, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </div>
          <div className="text-gray-400 text-sm">
            {stat.label}
          </div>
        </div>
      ))}
      <div className="col-span-3 text-center mt-2">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
