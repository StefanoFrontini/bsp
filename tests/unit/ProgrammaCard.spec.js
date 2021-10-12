import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import ProgrammaCard from "@/components/ProgrammaCard.vue";

test("renders props.programma when passed", async () => {
  // The render method returns a collection of utilities to query your component.
  const programma = {
    sponsor_serata: {
      nome: "Gabriella",
      cognome: "Passaro",
      foto: {
        url:
          "https://res.cloudinary.com/stefano75/image/upload/v1630354116/gabriella_passaro_foto_a7d27ecf70.jpg",
      },
    },
    sponsor: "Gabriella Passaro",
    created_at: "",
    titolo: "Privacy e diritto sul lavoro",
    descrizione: "",
    slug: "",
    data: new Date(),
  };

  const { getByText } = render(ProgrammaCard, {
    props: { programma },
  });

  // getByText returns the first matching node for the provided text, and
  // throws an error if no elements match or if more than one match is found.

  // getByText("Privacy e diritto sul lavoro");
  // getByText("Gabriella Passaro");

  // expect(getByText(programma.titolo)).toBeInTheDocument();
  // expect(
  //   getByText(
  //     `${programma.sponsor_serata.nome} ${programma.sponsor_serata.cognome}`
  //   )
  // ).toBeInTheDocument();

  expect(
    screen.getByText(
      `${programma.sponsor_serata.nome} ${programma.sponsor_serata.cognome}`
    )
  ).toBeInTheDocument();
});
