export const PassageText=( {text, grammarMistakes, onClickMistake })=>{

    return (
        <p>
          {text.split(" ").map((word, index) => {
            const mistake = grammarMistakes.find((m) => m.error === word);
            return (
              <span
                key={index}
                style={{
                  color: mistake ? "red" : "black",
                  cursor: mistake ? "pointer" : "auto",
                }}
                onClick={() => onClickMistake(mistake ? mistake.index : null)}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      );
    };
