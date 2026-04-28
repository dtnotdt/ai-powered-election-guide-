"use client";

export default function UserPill({ user, onLogout }) {
  if (!user) return null;

  const displayName = user.displayName || (user.isAnonymous ? 'Guest' : 'Voter');
  const photoURL = user.photoURL;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <button
      className="user-pill"
      onClick={onLogout}
      title={`Signed in as ${displayName}. Click to sign out.`}
      id="user-pill"
    >
      <div className="user-pill-avatar">
        {photoURL ? (
          <img src={photoURL} alt="" referrerPolicy="no-referrer" />
        ) : (
          initial
        )}
      </div>
      <span className="user-pill-name">{displayName}</span>
    </button>
  );
}
