import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail,
  Download,
  User,
  Briefcase,
  Sparkles,
  Phone,
  BookOpen
} from 'lucide-react';
import '@/styles/water-animations.css';

interface PersonalInfoProps {
  onSectionChange: (section: 'about' | 'portfolio') => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ onSectionChange }) => {
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    // 自动生成水波纹效果
    const interval = setInterval(() => {
      const newRipple = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      };
      setRipples(prev => [...prev.slice(-3), newRipple]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 3000);
  };

  const handleDownloadResume = async () => {
    try {
      // 尝试使用PDF链接下载
      const pdfUrl = 'https://agent-statics-tc.nuwax.com/tmp/63b51fff2e2b48519a001a233d46ac9d.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Chenrui_Zhu_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden relative"
      onClick={createRipple}
    >
      {/* 水波纹背景 */}
      <div className="absolute inset-0 water-surface opacity-30">
        <div className="water-texture" />
      </div>

      {/* 动态水波纹 */}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute w-64 h-64 rounded-full"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
              animation: 'ripple-expand 3s ease-out',
            }}
          />
        ))}
      </div>

      {/* 流动装饰元素 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-10"
            style={{
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animation: `water-flow ${15 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 主内容区域 */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } smooth-transition-slow`}>

          {/* 左侧 - 个人信息卡片 */}
          <div className="lg:col-span-1">
            <div className={`glass-effect rounded-2xl p-6 soft-shadow-lg hover-lift ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              animationDelay: mounted ? '0.2s' : '0s',
              animation: mounted ? 'slide-in-up 0.8s ease-out' : 'none'
            }}>
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-xl">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-3xl">
                      <User className="w-16 h-16" />
                    </AvatarFallback>
                  </Avatar>
                  {/* 水波纹装饰 */}
                  <div className="absolute -inset-4 rounded-full border-2 border-blue-200/20 animate-pulse" />
                </div>

                <h1 className="text-2xl font-bold mb-2 gradient-text smooth-transition">
                  Chenrui Zhu
                </h1>

                <div className="text-gray-600 text-sm mb-6 font-medium">
                  Enthusiast and developer of video games
                </div>

                {/* 装饰线条 */}
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6 rounded-full" />

                {/* 社交链接 */}
                <div className="flex justify-center space-x-3 mb-6">
                  {[
                    { icon: Mail, label: 'Email', info: 'leatonj6aneckawm729@gmail.com' },
                    { icon: BookOpen, label: 'Red Book', info: '5008959518' },
                    { icon: Phone, label: 'Phone', info: '+86 15355919667' }
                  ].map((social, index) => (
                    <div
                      key={social.label}
                      className="relative"
                      style={{
                        animationDelay: `${0.4 + index * 0.1}s`,
                        animation: mounted ? `slide-in-up 0.6s ease-out ${0.4 + index * 0.1}s both` : 'none'
                      }}
                    >
                      <button
                        className="group relative p-3 rounded-full bg-white/50 hover:bg-white transition-all duration-300 ripple-effect"
                        onMouseEnter={() => setHoveredIcon(social.label)}
                        onMouseLeave={() => setHoveredIcon(null)}
                      >
                        <social.icon className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
                      </button>

                      {/* Hover对话框 */}
                      {hoveredIcon === social.label && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-50">
                          <div className="font-medium">{social.label}</div>
                          <div className="text-xs text-gray-300">{social.info}</div>
                          {/* 箭头 */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover-lift ripple-effect smooth-transition hover:shadow-lg"
                  onClick={handleDownloadResume}
                >
                  <Download className="w-4 h-4 mr-2 inline-block" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>

          {/* 右侧 - 关于和技能 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 关于部分 */}
            <div className={`glass-effect rounded-2xl p-8 soft-shadow-lg hover-lift ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              animationDelay: mounted ? '0.3s' : '0s',
              animation: mounted ? 'slide-in-up 0.8s ease-out 0.3s both' : 'none'
            }}>
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 mr-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className={`${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} smooth-transition`}
                   style={{ animationDelay: '0.5s', animation: mounted ? 'text-fade-in-up 0.6s ease-out 0.5s both' : 'none' }}>
                  A passionate lover of stories, I enjoy science fiction, horror, historical literature, fantasy, anime, and narrative-driven games.
                </p>
                <p className={`${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} smooth-transition`}
                   style={{ animationDelay: '0.6s', animation: mounted ? 'text-fade-in-up 0.6s ease-out 0.6s both' : 'none' }}>
                  I am deeply interested in narrative and strategic elements in games, and I’m a fan of titles such as Suzerain, Europa Universalis IV, Crusader Kings II, and Don’t Starve.
                </p>
                <p className={`${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} smooth-transition`}
                  style={{ animationDelay: '0.6s', animation: mounted ? 'text-fade-in-up 0.6s ease-out 0.6s both' : 'none' }}>
                  I value the use of games as a medium for telling compelling stories, and I’m skilled at enhancing player immersion through narrative techniques such as autonomous NPC behaviors and dynamic feedback systems.
                </p>
              </div>
            </div>

            {/* 技能部分 */}
            <div className={`glass-effect rounded-2xl p-8 soft-shadow-lg hover-lift ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              animationDelay: mounted ? '0.4s' : '0s',
              animation: mounted ? 'slide-in-up 0.8s ease-out 0.4s both' : 'none'
            }}>
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 mr-4">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Skills & Expertise</h2>
              </div>

              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                {[
                  { name: 'AI Integration', color: 'from-violet-500 to-purple-600' },
                  { name: 'Content Design', color: 'from-rose-400 to-pink-500' },
                  { name: 'Unity Engine', color: 'from-cyan-400 to-blue-600' },
                  { name: 'Creative Writing', color: 'from-emerald-400 to-teal-600' }
                ].map((skill, index) => (
                  <div
                    key={skill.name}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center hover-lift smooth-transition ripple-effect cursor-pointer group"
                    style={{
                      animationDelay: mounted ? `${0.5 + index * 0.08}s` : '0s',
                      animation: mounted ? `slide-in-up 0.6s ease-out ${0.5 + index * 0.08}s both` : 'none'
                    }}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${skill.color} opacity-80 group-hover:opacity-100 smooth-transition group-hover:scale-110`} />
                    <div className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 导航按钮 */}
            <div className={`flex justify-center space-x-4 pt-4 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              animationDelay: mounted ? '0.8s' : '0s',
              animation: mounted ? 'slide-in-up 0.8s ease-out 0.8s both' : 'none'
            }}>
              <button
                className="px-8 py-3 bg-white/60 backdrop-blur-sm text-gray-700 rounded-xl font-medium hover-lift smooth-transition ripple-effect border border-white/40"
                onClick={() => onSectionChange('about')}
              >
                <User className="w-4 h-4 mr-2 inline-block" />
                About
              </button>
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover-lift smooth-transition ripple-effect"
                onClick={() => onSectionChange('portfolio')}
              >
                <Sparkles className="w-4 h-4 mr-2 inline-block" />
                Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};