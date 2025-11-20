import { useState, useCallback, memo, useMemo, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { LiteraryWork, type ReadingSettings } from './LiteraryWorks';

// 防抖Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 虚拟化文本内容组件
const VirtualizedContent = memo(({
  content,
  settings
}: {
  content: string;
  settings: ReadingSettings;
}) => {
  const paragraphs = useMemo(() => {
    return content.split('\n\n').filter(p => p.trim());
  }, [content]);

  const renderParagraphs = useMemo(() => {
    return paragraphs.map((paragraph, index) => (
      <p
        key={`para-${index}`}
        className="mb-4"
      >
        {paragraph.trim()}
      </p>
    ));
  }, [paragraphs]);

  return (
    <div className={`whitespace-pre-wrap text-gray-700 ${settings.fontSize} ${settings.lineHeight} ${settings.fontFamily} reading-content`}>
      {renderParagraphs}
    </div>
  );
});

VirtualizedContent.displayName = 'VirtualizedContent';

// 阅读设置组件
const ReadingSettings = memo(({
  settings,
  onSettingsChange
}: {
  settings: ReadingSettings;
  onSettingsChange: (settings: ReadingSettings) => void;
}) => {
  const handleSizeChange = useCallback((size: string) => {
    onSettingsChange({ ...settings, fontSize: size });
  }, [onSettingsChange, settings]);

  const handleLineHeightChange = useCallback((spacing: string) => {
    onSettingsChange({ ...settings, lineHeight: spacing });
  }, [onSettingsChange, settings]);

  const handleFontChange = useCallback((font: string) => {
    onSettingsChange({ ...settings, fontFamily: font });
  }, [onSettingsChange, settings]);

  return (
    <>
      {/* Font Size Settings */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">Size:</span>
        <div className="flex space-x-1">
          {['text-sm', 'text-lg', 'text-xl', 'text-2xl'].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                settings.fontSize === size
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {size.replace('text-', '').replace('sm', 'S').replace('lg', 'M').replace('xl', 'L').replace('2xl', 'XL')}
            </button>
          ))}
        </div>
      </div>

      {/* Line Height Settings */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">Line:</span>
        <div className="flex space-x-1">
          {['leading-normal', 'leading-relaxed', 'leading-loose'].map((spacing) => (
            <button
              key={spacing}
              onClick={() => handleLineHeightChange(spacing)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                settings.lineHeight === spacing
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {spacing.replace('leading-', '').replace('normal', 'Normal').replace('relaxed', 'Relaxed').replace('loose', 'Loose')}
            </button>
          ))}
        </div>
      </div>

      {/* Font Settings */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">Font:</span>
        <div className="flex space-x-1">
          {[
            { class: 'font-serif', name: 'Serif' },
            { class: 'font-sans', name: 'Sans' }
          ].map((font) => (
            <button
              key={font.class}
              onClick={() => handleFontChange(font.class)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                settings.fontFamily === font.class
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
});

ReadingSettings.displayName = 'ReadingSettings';

interface ReaderModalProps {
  work: LiteraryWork;
  onClose: () => void;
  initialSettings: ReadingSettings;
}

export const ReaderModal = memo(({ work, onClose, initialSettings }: ReaderModalProps) => {
  const [settings, setSettings] = useState<ReadingSettings>(initialSettings);
  const debouncedSettings = useDebounce(settings, 300);

  const handleSettingsChange = useCallback((newSettings: ReadingSettings) => {
    setSettings(newSettings);
  }, []);

  const handleFavorite = useCallback(() => {
    // TODO: Implement favorite functionality
    console.log('Favorited:', work.title);
  }, [work.title]);

  const handleShare = useCallback(() => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: work.title,
        text: work.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  }, [work.title, work.description]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm reader-backdrop">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          aria-label="Close reader"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Reader Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{work.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium">
                  {work.type.replace('-', ' ').toUpperCase()}
                </span>
                <span>{work.style}</span>
                {work.wordCount && <span>{work.wordCount} words</span>}
                {work.readingTime && <span>~{work.readingTime} min read</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Reading Settings Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Reading Settings:</span>
              <ReadingSettings settings={settings} onSettingsChange={handleSettingsChange} />
            </div>

            {/* Fullscreen Button */}
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Reader Content */}
        <div className="max-h-[50vh] overflow-y-auto px-8 py-8 bg-white">
          <div className="prose prose-lg max-w-none">
            {work.fullContent ? (
              <VirtualizedContent content={work.fullContent} settings={debouncedSettings} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Full content is being prepared...</p>
              </div>
            )}
          </div>
        </div>

        {/* Reader Bottom Toolbar */}
        <div className="bg-gray-50 border-t border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Reading Progress:</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full reading-progress-bar" style={{ width: '100%' }}></div>
              </div>
              <span className="text-sm text-gray-700 font-medium">100%</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleFavorite}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Favorite</span>
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ReaderModal.displayName = 'ReaderModal';

export default ReaderModal;