import { Meaning } from "./meaning";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import { useAudio } from "../hooks/use-audio";

function getAudioUrl(response) {
  const audio = response.phonetics.find((phonetic) => Boolean(phonetic.audio));
  return audio?.audio ?? null;
}

export function DictionaryCard({ response }) {
  const { playAudio, isAudioLoading } = useAudio(getAudioUrl(response));

  return (
    <div className="card">
      <div>
        <div className="card__header">
          <h3 className="card__heading">{response.word}</h3>
          <button
            aria-label="play audio"
            className="card__play-audio"
            onClick={playAudio}
          >
            {isAudioLoading ? (
              <ImSpinner2 className="audio__loader" fontSize={18} />
            ) : (
              <HiOutlineSpeakerWave />
            )}
          </button>
        </div>
        <span className="card__sub-heading">{response.phonetic}</span>
      </div>

      <div className="card__meanings">
        {response.meanings.map((meaning, index) => (
          <Meaning key={index} meaning={meaning} />
        ))}
      </div>
    </div>
  );
}
