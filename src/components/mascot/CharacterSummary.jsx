import { Link } from 'react-router-dom';

function CharacterSummary({ character }) {
  return (
    <div>
      {character.photo && (
        <img
          src={character.photo}
          alt={character.name}
          className="w-5 h-5 mr-1 rounded inline"
        />
      )}
      <Link to={`/mascot/${character.id}/`}>{character.name}</Link>
    </div>
  );
}

export default CharacterSummary;
