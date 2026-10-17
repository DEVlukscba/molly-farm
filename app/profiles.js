const PROFILES_KEY = 'molly_profiles';

export const EMOJI_OPTIONS = ['🌸','⭐','🦊','🐸','🦋','🐧','🌈','🚀','🦁','🐶','🐱','🐰'];

function load() {
  try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || 'null'); }
  catch { return null; }
}

function save(data) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(data));
}

export function getProfiles() {
  return load()?.profiles ?? [];
}

export function getActiveProfile() {
  const data = load();
  if (!data?.profiles?.length) return null;
  return data.profiles.find(p => p.id === data.activeId) ?? data.profiles[0];
}

export function getChildName() {
  return getActiveProfile()?.name ?? 'amigo';
}

export function setActiveProfile(id) {
  const data = load() ?? { parentPin: null, activeId: null, profiles: [] };
  data.activeId = id;
  save(data);
}

export function addProfile(name, emoji) {
  const data = load() ?? { parentPin: null, activeId: null, profiles: [] };
  const id = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;
  const profile = { id, name, emoji };
  data.profiles.push(profile);
  if (!data.activeId) data.activeId = id;
  save(data);
  return profile;
}

export function removeProfile(id) {
  const data = load();
  if (!data) return;
  data.profiles = data.profiles.filter(p => p.id !== id);
  if (data.activeId === id) data.activeId = data.profiles[0]?.id ?? null;
  save(data);
}

export function getParentPin() {
  return load()?.parentPin ?? null;
}

export function setParentPin(pin) {
  const data = load() ?? { parentPin: null, activeId: null, profiles: [] };
  data.parentPin = pin || null;
  save(data);
}

export function checkParentPin(pin) {
  const stored = getParentPin();
  if (!stored) return true;
  return stored === pin;
}
