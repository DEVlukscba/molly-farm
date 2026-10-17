import { getActiveProfile } from './profiles.js';

const TOTALS = {
  math_1: 8, math_2: 8, math_3: 8, math_4: 8,
  math_5: 8, math_6: 8, math_7: 8, math_8: 8,
  touch_1: 3, touch_2: 3, touch_3: 3,
};

function getKey() {
  const p = getActiveProfile();
  return p ? `molly_progress_${p.id}` : 'molly_progress';
}

function load() {
  try { return JSON.parse(localStorage.getItem(getKey()) || '{}'); }
  catch { return {}; }
}

function save(data) {
  localStorage.setItem(getKey(), JSON.stringify(data));
}

export function isUnlocked(branch, level) {
  if (level === 1) return true;
  const prevKey = `${branch}_${level - 1}`;
  const done = (load()[prevKey] || { done: [] }).done;
  return done.length >= (TOTALS[prevKey] || Infinity);
}

export function getProgress(branch, level) {
  const key = `${branch}_${level}`;
  return {
    done: (load()[key] || { done: [] }).done,
    total: TOTALS[key] || 0,
  };
}

export function markDone(branch, level, actId) {
  const key = `${branch}_${level}`;
  const data = load();
  if (!data[key]) data[key] = { done: [] };
  if (!data[key].done.includes(actId)) {
    data[key].done.push(actId);
    save(data);
  }
  return data[key].done.length >= (TOTALS[key] || Infinity);
}

export function resetAll() {
  localStorage.removeItem(getKey());
}

export function resetForProfile(profileId) {
  localStorage.removeItem(`molly_progress_${profileId}`);
}
