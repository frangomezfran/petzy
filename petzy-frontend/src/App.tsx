import React, { useState, useEffect, ChangeEvent } from 'react';
import { PlusCircle, LayoutDashboard, Dog, Cat, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from './services/api';
import logo from './assets/logo.svg';

interface Breed {
  id: number;
  name: string;
  species: string;
}

interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  name: string;
}

/**
 * Componente FloatingInput Estilo Moderno:
 * Fondo Blanco, Borde Verde y Labels con Fondo Blanco cuando flotan.
 */
const FloatingInput: React.FC<FloatingInputProps> = ({ label, value, onChange, type = "text", placeholder = "", name = "" }) => (
  <div className="relative w-full group">
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="block w-full px-5 py-5 text-petzy-negro bg-white rounded-2xl border-2 border-petzy-verde-oscuro/30 focus:border-petzy-verde-oscuro outline-none transition-all font-bold peer shadow-sm"
      placeholder=" " 
    />
    <label
      htmlFor={name}
      className="absolute text-sm font-bold text-petzy-negro/40 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:bg-transparent peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:bg-white peer-focus:text-petzy-verde-oscuro transition-all"
    >
      {label}
    </label>
    {placeholder && (
      <div className="text-[10px] font-bold text-petzy-verde-oscuro/40 mt-1 ml-4 opacity-0 group-focus-within:opacity-100 transition-opacity italic">
        {placeholder}
      </div>
    )}
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [ownerData, setOwnerData] = useState({ fullName: '', dni: '', email: '', phone: '' });
  const [petData, setPetData] = useState({ name: '', species: 'DOG', breedId: '', birthDate: '', color: '' });
  const [file, setFile] = useState<File | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      api.get(`/pets/breeds?species=${petData.species}`)
        .then(res => setBreeds(res.data))
        .catch(err => console.error("Error cargando razas:", err));
    }
  }, [petData.species, isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegister = async () => {
    if (!petData.breedId) return;
    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append('ownerName', ownerData.fullName);
    formData.append('ownerDni', ownerData.dni);
    formData.append('ownerEmail', ownerData.email);
    formData.append('ownerPhone', ownerData.phone);
    formData.append('petName', petData.name);
    formData.append('petSpecies', petData.species);
    formData.append('breedId', petData.breedId);
    formData.append('birthDate', petData.birthDate);
    formData.append('gender', 'M');
    formData.append('color', petData.color);
    if (file) formData.append('healthRecordImage', file);

    try {
      await api.post('/pets/register', formData);
      setMessage({ type: 'success', text: 'Mascota registrada con éxito' });
      setStep(1);
      setPetData({ name: '', species: 'DOG', breedId: '', birthDate: '', color: '' });
      setOwnerData({ fullName: '', dni: '', email: '', phone: '' });
      setFile(null);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al registrar. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-petzy-crema p-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl w-full max-w-md border border-petzy-crema-oscuro animate-fade-in">
          <div className="flex flex-col items-center mb-10 text-center">
            <img src={logo} alt="Petzy Logo" className="w-20 h-20 mb-6" />
            <h1 className="text-4xl font-black text-petzy-negro">Petzy</h1>
            <p className="text-slate-400 font-bold text-sm">Ingresa a tu cuenta</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
             <FloatingInput label="Usuario" name="user" value="" onChange={() => {}} placeholder="admin" />
             <FloatingInput label="Contraseña" name="pass" type="password" value="" onChange={() => {}} placeholder="••••••••" />
             <button type="submit" className="w-full py-5 rounded-full text-white bg-petzy-verde-oscuro hover:brightness-110 font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-petzy-verde-oscuro/20">
              Entrar
             </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-petzy-crema overflow-hidden">
      <aside className="w-24 bg-petzy-crema-oscuro border-r border-black/5 flex flex-col items-center py-10 shrink-0">
        <img src={logo} alt="Petzy" className="w-12 h-12 mb-12" />
        <nav className="flex flex-col space-y-10">
          <button className="p-3 rounded-2xl bg-white text-petzy-verde-oscuro shadow-md"><LayoutDashboard className="w-6 h-6" /></button>
          <button className="p-3 rounded-2xl text-black/20"><PlusCircle className="w-6 h-6" /></button>
        </nav>
      </aside>

      <main className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-3xl animate-fade-in">
          <header className="flex justify-between items-center mb-10 px-6">
            <h2 className="text-3xl font-black text-petzy-negro tracking-tighter">Registro de mascota</h2>
            <div className="bg-petzy-verde-oscuro text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
              Admin Petzy
            </div>
          </header>

          {message && (
            <div className={`mx-6 p-5 mb-8 rounded-[2rem] flex items-center space-x-4 border-2 ${message.type === 'success' ? 'bg-petzy-verde-claro border-petzy-verde-oscuro text-petzy-verde-oscuro' : 'bg-petzy-rosa border-white text-white'}`}>
              {message.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              <span className="font-bold text-sm tracking-tight">{message.text}</span>
            </div>
          )}

          <div className="bg-white rounded-[3.5rem] shadow-xl p-12 border border-black/5">
            {/* Minimalist Stepper */}
            <div className="flex mb-16 justify-center items-center">
               <div className="flex flex-col items-center group">
                  <div className={`w-12 h-12 rounded-[1.25rem] border-2 flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 1 ? 'border-petzy-verde-oscuro bg-petzy-verde-oscuro text-white shadow-lg' : 'border-petzy-verde-claro bg-white text-petzy-verde-claro'}`}>1</div>
                  <span className={`text-[11px] font-bold mt-3 transition-colors ${step >= 1 ? 'text-petzy-verde-oscuro' : 'text-slate-300'}`}>Dueño</span>
               </div>
               <div className={`w-20 h-1 mx-4 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-petzy-verde-oscuro' : 'bg-petzy-verde-claro/30'}`} />
               <div className="flex flex-col items-center group">
                  <div className={`w-12 h-12 rounded-[1.25rem] border-2 flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 2 ? 'border-petzy-verde-oscuro bg-petzy-verde-oscuro text-white shadow-lg' : 'border-petzy-verde-claro bg-white text-petzy-verde-claro'}`}>2</div>
                  <span className={`text-[11px] font-bold mt-3 transition-colors ${step >= 2 ? 'text-petzy-verde-oscuro' : 'text-slate-300'}`}>Mascota</span>
               </div>
            </div>

            {step === 1 ? (
              <section className="space-y-10 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                  <FloatingInput label="Nombre completo" name="fname" value={ownerData.fullName} onChange={(e: ChangeEvent<HTMLInputElement>) => setOwnerData({...ownerData, fullName: e.target.value})} placeholder="Ej: Franco Petzy" />
                  <FloatingInput label="Documento (DNI)" name="dni" value={ownerData.dni} onChange={(e: ChangeEvent<HTMLInputElement>) => setOwnerData({...ownerData, dni: e.target.value})} placeholder="Solo números" />
                  <FloatingInput label="Correo electrónico" name="mail" value={ownerData.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setOwnerData({...ownerData, email: e.target.value})} placeholder="ejemplo@correo.com" />
                  <FloatingInput label="Teléfono de contacto" name="tel" value={ownerData.phone} onChange={(e: ChangeEvent<HTMLInputElement>) => setOwnerData({...ownerData, phone: e.target.value})} placeholder="Incluir código de área" />
                </div>
                <div className="flex justify-center pt-8">
                  <button onClick={() => setStep(2)} disabled={!ownerData.dni || !ownerData.fullName} className="bg-petzy-negro text-white py-5 px-20 rounded-full font-black text-sm hover:brightness-125 transition-all shadow-xl disabled:opacity-20 active:scale-95">
                    Siguiente paso
                  </button>
                </div>
              </section>
            ) : (
              <section className="space-y-12 animate-fade-in">
                <div className="flex space-x-8">
                   <button onClick={() => setPetData({...petData, species: 'DOG'})} className={`flex-1 p-10 rounded-[2.5rem] border-4 transition-all flex flex-col items-center justify-center space-y-4 ${petData.species === 'DOG' ? 'border-petzy-verde-oscuro bg-white shadow-xl text-petzy-verde-oscuro scale-105' : 'border-transparent bg-slate-400/5 text-slate-300 grayscale'}`}>
                      <Dog className="w-12 h-12" /><span className="font-bold text-sm tracking-tight">Es un perro</span>
                   </button>
                   <button onClick={() => setPetData({...petData, species: 'CAT'})} className={`flex-1 p-10 rounded-[2.5rem] border-4 transition-all flex flex-col items-center justify-center space-y-4 ${petData.species === 'CAT' ? 'border-petzy-rosa bg-white shadow-xl text-petzy-rosa scale-105' : 'border-transparent bg-slate-400/5 text-slate-300 grayscale'}`}>
                      <Cat className="w-12 h-12" /><span className="font-bold text-sm tracking-tight">Es un gato</span>
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                  <FloatingInput label="Nombre de la mascota" name="pname" value={petData.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setPetData({...petData, name: e.target.value})} placeholder="Ej: Lolo" />
                  <div className="relative group">
                    <select 
                      value={petData.breedId} 
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setPetData({...petData, breedId: e.target.value})} 
                      className="block w-full px-5 pb-3 pt-7 text-petzy-negro bg-white rounded-2xl border-2 border-petzy-verde-oscuro/30 focus:border-petzy-verde-oscuro appearance-none font-bold transition-all peer outline-none shadow-sm"
                    >
                      <option value="">-- Seleccionar raza --</option>
                      {breeds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                    <label className="absolute text-[10px] font-bold text-petzy-verde-oscuro duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 bg-white px-2">Raza detectada</label>
                  </div>
                  <FloatingInput label="Fecha de nacimiento" name="bdate" type="date" value={petData.birthDate} onChange={(e: ChangeEvent<HTMLInputElement>) => setPetData({...petData, birthDate: e.target.value})} />
                  <FloatingInput label="Color del manto" name="pcolor" value={petData.color} onChange={(e: ChangeEvent<HTMLInputElement>) => setPetData({...petData, color: e.target.value})} placeholder="Ej: Blanco con manchas" />
                </div>

                <div className="p-10 bg-petzy-crema/20 rounded-[2.5rem] border-4 border-dashed border-white/60 flex flex-col items-center space-y-4">
                  <p className="text-xs font-bold text-petzy-negro/40">Libreta sanitaria (Imagen)</p>
                  <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} className="text-[10px] font-bold text-slate-500 file:mr-6 file:py-3 file:px-10 file:rounded-full file:border-0 file:font-black file:uppercase file:bg-petzy-lavanda file:text-white cursor-pointer hover:scale-105 transition-all shadow-sm" />
                </div>

                <div className="flex space-x-6 pt-6">
                  <button onClick={() => setStep(1)} className="py-5 px-10 text-xs font-bold text-slate-300 hover:text-slate-500 transition-colors tracking-tight">Volver atrás</button>
                  <button onClick={handleRegister} disabled={loading || !petData.name || !petData.breedId} className="flex-1 bg-petzy-verde-oscuro text-white py-5 px-12 rounded-full font-black text-sm transition-all shadow-xl shadow-petzy-verde-oscuro/20 disabled:opacity-20 active:scale-95 flex items-center justify-center">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : null}
                    {loading ? 'Registrando...' : 'Finalizar registro'}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
