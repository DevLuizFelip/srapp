import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Ícones SVG ---
const TwitterIcon = () => ( <svg viewBox="0 0 24 24" fill="currentColor" className="source-icon"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.08 11.37-11.37 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.98-2.08z"></path></svg> );
const RedditIcon = () => ( <svg viewBox="0 0 24 24" fill="currentColor" className="source-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v2h-2v-2zm0 4h2v6h-2v-6z"></path></svg> );
const WebIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="source-icon"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> );
const SettingsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.007 1.11-1.227l.128-.054a2.25 2.25 0 012.862 2.862l-.054.128c-.22.55-.685 1.02-1.227 1.11a2.25 2.25 0 01-2.862-2.862zM12 17.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg> );
const SyncIcon = ({ isSyncing }) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`icon ${isSyncing ? 'syncing' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.695v-2.113a8.25 8.25 0 00-11.664 0v2.113" /></svg> );
const CheckCircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> );
const CircleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );

// --- Componente do Painel de Configurações ---
const SettingsPanel = ({ sources, setSources, onClose }) => {
    const [newSource, setNewSource] = useState('');
    const handleAddSource = (e) => { e.preventDefault(); if (newSource && !sources.includes(newSource)) { setSources([...sources, newSource.trim()]); setNewSource(''); } };
    const handleRemoveSource = (sourceToRemove) => { setSources(sources.filter(source => source !== sourceToRemove)); };
    return ( <div className="modal-overlay"><div className="modal-content"><div className="modal-header"><h2 className="modal-title">Configurar Fontes</h2><button onClick={onClose} className="modal-close-button">&times;</button></div><p className="modal-subtitle">Adicione perfis do Twitter (ex: @usuario), subreddits (ex: r/nome) ou URLs de sites.</p><form onSubmit={handleAddSource} className="modal-form"><input type="text" value={newSource} onChange={(e) => setNewSource(e.target.value)} placeholder="Ex: @naturelover" className="modal-input"/><button type="submit" className="button primary">Adicionar</button></form><h3 className="sources-title">Fontes Atuais:</h3><ul className="sources-list">{sources.map(source => ( <li key={source} className="source-item"><span>{source}</span><button onClick={() => handleRemoveSource(source)} className="button-remove">REMOVER</button></li> ))}{sources.length === 0 && <p className="no-sources-message">Nenhuma fonte adicionada.</p>}</ul></div></div> );
};

// --- Componente: Modal para Visualizar Mídia ---
const MediaViewerModal = ({ mediaList, currentIndex, onClose }) => {
  const [localIndex, setLocalIndex] = useState(currentIndex);
  const touchStartX = useRef(0);

  const goToPrevious = useCallback(() => {
    setLocalIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : mediaList.length - 1));
  }, [mediaList.length]);

  const goToNext = useCallback(() => {
    setLocalIndex(prevIndex => (prevIndex < mediaList.length - 1 ? prevIndex + 1 : 0));
  }, [mediaList.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);
  
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => {
    if (touchStartX.current === 0) return;
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) { // Limiar de swipe
      if (diff > 0) goToNext();
      else goToPrevious();
      touchStartX.current = 0; // Reset
    }
  };

  if (currentIndex === null) return null;
  const media = mediaList[localIndex];
  const downloadUrl = `http://localhost:3001/api/download?url=${encodeURIComponent(media.url)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content media-viewer" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
        <button className="modal-nav-button prev" onClick={goToPrevious}>&#10094;</button>
        <div className="media-viewer-content">
          {media.type === 'image' ? ( <img src={media.url} alt={`Post by ${media.author}`} /> ) : ( <video controls autoPlay key={media.id}> <source src={media.url} type="video/mp4" /> Seu navegador não suporta a tag de vídeo. </video> )}
        </div>
        <div className="media-viewer-footer">
          <span className="media-viewer-author">{media.author}</span>
          <a href={downloadUrl} className="button download" download>Baixar Mídia</a>
          <span className="media-viewer-counter">{localIndex + 1} / {mediaList.length}</span>
        </div>
        <button className="modal-nav-button next" onClick={goToNext}>&#10095;</button>
      </div>
    </div>
  );
};

// --- Componente para um item da Mídia (Card) ---
const MediaItem = ({ item, onView, onToggleSelect, isSelected }) => {
  const getSourceIcon = (source) => {
    switch (source) { case 'twitter': return <TwitterIcon />; case 'reddit': return <RedditIcon />; case 'web': return <WebIcon />; default: return null; }
  };
  return (
    <div className={`media-card ${isSelected ? 'selected' : ''}`}>
      <div className="selection-overlay">
        <div className="selection-icon" onClick={() => onToggleSelect(item.id)}>
          {isSelected ? <CheckCircleIcon /> : <CircleIcon />}
        </div>
      </div>
      <div className="media-preview" onClick={() => onView(item)}>
        {item.type === 'image' ? ( <img src={item.url} alt={`Post by ${item.author}`} loading="lazy" /> ) : ( <video muted loop preload="metadata" poster={item.thumbnailUrl}> <source src={`${item.url}#t=0.5`} type="video/mp4" /> </video> )}
      </div>
      <div className="card-footer">
        <div className="author-info">{getSourceIcon(item.source)}<span>{item.author}</span></div>
        <button onClick={() => onView(item)} className="button download">Visualizar</button>
      </div>
    </div>
  );
};

// --- Componente Principal da Aplicação ---
export default function App() {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [activeFilter, setActiveFilter] = useState('recentes');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  
  const [sources, setSources] = useState(() => {
    try {
      const savedSources = localStorage.getItem('mediaFeedSources');
      return savedSources ? JSON.parse(savedSources) : [];
    } catch (error) {
      console.error("Failed to parse sources from localStorage", error);
      return [];
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [viewingMediaIndex, setViewingMediaIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  
  useEffect(() => {
    localStorage.setItem('mediaFeedSources', JSON.stringify(sources));
  }, [sources]);

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('mediaFeedVisited');
    if (isFirstVisit && sources.length === 0) {
      setIsSettingsOpen(true);
      localStorage.setItem('mediaFeedVisited', 'true');
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (sources.length === 0) {
        setMedia([]);
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const sourcesQueryParam = sources.join(',');
      const response = await fetch(`https://srappback.onrender.com/api/media?sources=${sourcesQueryParam}`);
      if (!response.ok) throw new Error('A resposta da rede não foi boa.');
      const data = await response.json();
      const formattedData = data.map(item => ({...item, timestamp: new Date(item.timestamp)}));
      const sortedData = formattedData.sort((a, b) => b.timestamp - a.timestamp);
      setMedia(sortedData);
    } catch (error) {
      console.error("Falha ao buscar dados do backend:", error);
      setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando e tente sincronizar novamente.');
      setMedia([]);
    } finally {
      setIsLoading(false);
    }
  }, [sources]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    let filtered = [...media];
    if (activeFilter === 'imagens') filtered = media.filter(item => item.type === 'image');
    else if (activeFilter === 'videos') filtered = media.filter(item => item.type === 'video');
    setFilteredMedia(filtered);
  }, [media, activeFilter]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 && !isLoading) {
        if (visibleCount < filteredMedia.length) setVisibleCount(prevCount => prevCount + 6);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, visibleCount, filteredMedia]);

  const handleToggleSelect = (itemId) => {
    setSelectedItems(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };

  const handleBulkDownload = () => {
    const selectedUrls = media.filter(item => selectedItems.includes(item.id)).map(item => item.url);
    selectedUrls.forEach((url, index) => {
      setTimeout(() => {
        const downloadUrl = `http://localhost:3001/api/download?url=${encodeURIComponent(url)}`;
        window.open(downloadUrl, '_blank');
      }, index * 300);
    });
  };

  const handleView = (item) => {
    const itemIndex = filteredMedia.findIndex(mediaItem => mediaItem.id === item.id);
    setViewingMediaIndex(itemIndex);
  };

  const FilterButton = ({ filterType, children }) => ( <button onClick={() => setActiveFilter(filterType)} className={`button filter-button ${activeFilter === filterType ? 'active' : ''}`}> {children} </button> );

  return (
    <>
      <style>{`
        :root { --blur-effect: ${isSettingsOpen || viewingMediaIndex !== null ? 'blur(8px)' : 'none'}; }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; background-color: #111827; color: #ffffff; }
        
        .app-container-wrapper {
            transition: filter 0.3s ease-in-out;
            filter: var(--blur-effect);
        }

        .main-content { max-width: 1280px; margin: 0 auto; padding: 2rem 1rem; }
        
        .app-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        .header-text {
            text-align: left;
        }
        .header-title { 
            font-size: clamp(1.5rem, 4vw, 2rem); 
            font-weight: 700; 
            margin: 0;
        }
        .header-subtitle { 
            color: #9ca3af; 
            margin: 0.25rem 0 0 0;
        }
        .header-actions {
            display: flex;
            gap: 0.5rem;
            flex-shrink: 0;
        }
        @media (max-width: 640px) {
            .app-header {
                flex-direction: column;
                justify-content: center;
                gap: 1rem;
            }
            .header-text {
                text-align: center;
            }
        }

        .icon-button { background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0.5rem; transition: color 0.2s; }
        .icon-button:hover { color: #ffffff; }
        .icon-button:disabled { opacity: 0.5; cursor: not-allowed; }
        .icon { width: 1.5rem; height: 1.5rem; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .syncing { animation: spin 1s linear infinite; }
        .filters-container { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .button { padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 0.375rem; border: none; cursor: pointer; transition: background-color 0.2s; background-color: #374151; color: #ffffff; }
        .button:hover { background-color: #4b5563; }
        .button.primary { background-color: #2563eb; }
        .button.primary:hover { background-color: #1d4ed8; }
        .button.filter-button.active { background-color: #2563eb; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .button.download { font-size: 0.875rem; padding: 0.25rem 0.75rem; background-color: #2563eb; }
        .button.download:hover { background-color: #1d4ed8; }
        
        .media-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(1, 1fr);
        }
        @media (min-width: 640px) {
            .media-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (min-width: 1024px) {
            .media-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        .media-card { position: relative; background-color: #1f2937; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); transition: transform 0.3s; border: 2px solid transparent; }
        .media-card.selected { border-color: #2563eb; }
        .media-preview { cursor: pointer; aspect-ratio: 16 / 9; background-color: #374151; }
        .media-preview img, .media-preview video { width: 100%; height: 100%; object-fit: cover; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; padding: 1rem; }
        .author-info { display: flex; align-items: center; gap: 0.5rem; color: #9ca3af; font-size: 0.875rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .source-icon { width: 1.25rem; height: 1.25rem; flex-shrink: 0; }
        .selection-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.2s; z-index: 10; pointer-events: none; }
        .media-card:hover .selection-overlay, .media-card.selected .selection-overlay { opacity: 1; }
        .selection-icon { position: absolute; top: 0.75rem; left: 0.75rem; color: white; width: 1.5rem; height: 1.5rem; pointer-events: auto; cursor: pointer; }
        .loader-container { display: flex; justify-content: center; align-items: center; height: 16rem; }
        .loader { width: 4rem; height: 4rem; border-radius: 50%; border: 2px solid transparent; border-top-color: #3b82f6; border-bottom-color: #3b82f6; animation: spin 1s linear infinite; }
        .error-message { background-color: #450a0a; border: 1px solid #7f1d1d; color: #fecaca; padding: 0.75rem 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; text-align: center; }
        .empty-state { text-align: center; padding: 4rem 0; color: #6b7280; }
        .modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 50; padding: 1rem; }
        .modal-content { background-color: #1f2937; border-radius: 0.5rem; padding: 1.5rem; width: 100%; max-width: 28rem; max-height: 90vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .modal-title { font-size: 1.25rem; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .modal-close-button { background: none; border: none; color: #9ca3af; font-size: 1.5rem; line-height: 1; cursor: pointer; }
        .modal-form { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .modal-input { flex-grow: 1; background-color: #374151; color: #ffffff; border-radius: 0.375rem; padding: 0.5rem 0.75rem; border: 1px solid transparent; }
        .modal-content.media-viewer { position: relative; max-width: 90vw; max-height: 90vh; padding: 0; display: flex; flex-direction: column; background-color: #000; }
        .media-viewer-content { flex-grow: 1; display: flex; justify-content: center; align-items: center; overflow: hidden; }
        .media-viewer-content img, .media-viewer-content video { max-width: 100%; max-height: calc(90vh - 60px); object-fit: contain; }
        .media-viewer-footer { padding: 0.5rem 1rem; text-align: center; background-color: rgba(0,0,0,0.5); position: absolute; bottom: 0; left: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; }
        .media-viewer-author, .media-viewer-counter { color: #d1d5db; font-size: 0.875rem; }
        .modal-nav-button { position: absolute; top: 50%; transform: translateY(-50%); background-color: rgba(0,0,0,0.3); color: white; border: none; font-size: 2rem; cursor: pointer; padding: 1rem 0.5rem; z-index: 60; transition: background-color 0.2s; }
        .modal-nav-button:hover { background-color: rgba(0,0,0,0.6); }
        .modal-nav-button.prev { left: 0; border-radius: 0 0.5rem 0.5rem 0; }
        .modal-nav-button.next { right: 0; border-radius: 0.5rem 0 0 0.5rem; }
        .bulk-download-fab { position: fixed; bottom: 2rem; right: 2rem; z-index: 40; background-color: #2563eb; color: white; border: none; border-radius: 50px; padding: 1rem 1.5rem; font-weight: 600; cursor: pointer; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3); display: flex; align-items: center; gap: 0.5rem; transition: transform 0.2s ease-out; }
        .bulk-download-fab:hover { transform: scale(1.05); }
      `}</style>
      <div className="app-container-wrapper">
        <div className="main-content">
          <header className="app-header">
            <div className="header-text">
                <h1 className="header-title">Seu Feed de Mídia</h1>
                <p className="header-subtitle">Todo o seu conteúdo favorito em um só lugar.</p>
            </div>
            <div className="header-actions">
              <button onClick={fetchData} disabled={isLoading} className="icon-button" title="Sincronizar"><SyncIcon isSyncing={isLoading} /></button>
              <button onClick={() => setIsSettingsOpen(true)} className="icon-button" title="Configurações"><SettingsIcon /></button>
            </div>
          </header>
          <div className="filters-container">
            <FilterButton filterType="recentes">Mais Recentes</FilterButton>
            <FilterButton filterType="imagens">Imagens</FilterButton>
            <FilterButton filterType="videos">Vídeos</FilterButton>
          </div>
          {error && ( <div className="error-message"><strong>Erro de Conexão: </strong><span>{error}</span></div> )}
          {isLoading && media.length === 0 && sources.length > 0 ? ( <div className="loader-container"><div className="loader"></div></div> ) : (
            <>
              {!error && filteredMedia.length > 0 ? (
                  <div className="media-grid">
                  {filteredMedia.slice(0, visibleCount).map(item => (
                      <MediaItem key={item.id} item={item} onView={() => handleView(item)} onToggleSelect={handleToggleSelect} isSelected={selectedItems.includes(item.id)} />
                  ))}
                  </div>
              ) : !error && (
                  <div className="empty-state">
                      <p>{sources.length === 0 ? "Bem-vindo! Adicione uma fonte nas configurações para começar." : "Nenhum conteúdo encontrado para as fontes configuradas."}</p>
                      <p>Tente adicionar novas fontes nas configurações.</p>
                  </div>
              )}
            </>
          )}
          {isLoading && media.length > 0 && <div className="loader-container"><div className="loader"></div></div>}
        </div>
        {selectedItems.length > 0 && (
          <button className="bulk-download-fab" onClick={handleBulkDownload}>
            Baixar ({selectedItems.length})
          </button>
        )}
      </div>
      
      {viewingMediaIndex !== null && <MediaViewerModal mediaList={filteredMedia} currentIndex={viewingMediaIndex} onClose={() => setViewingMediaIndex(null)} />}
      {isSettingsOpen && <SettingsPanel sources={sources} setSources={setSources} onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
}
