export function Meaning({ meaning }) {
  return (
    <div key={meaning.partOfSpeech} className="meaning">
      <h4 className="meaning__heading">{meaning.partOfSpeech}</h4>
      <ul className="meaning__list">
        {meaning.definitions.map(({ definition }) => (
          <li key={definition}>{definition}</li>
        ))}
      </ul>
    </div>
  );
}
