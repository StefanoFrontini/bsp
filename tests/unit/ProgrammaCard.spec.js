import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import ProgrammaCard from "@/components/ProgrammaCard.vue";

test("renders props.programma when passed", async () => {
  // The render method returns a collection of utilities to query your component.
  const programma = {
    sponsor_photo: "",
    sponsor: "",
    created_at: "",
    title: "Privacy e diritto sul lavoro",
    description: "",
    path: "",
  };

  const { getByText } = render(ProgrammaCard, {
    props: { programma },
  });

  // getByText returns the first matching node for the provided text, and
  // throws an error if no elements match or if more than one match is found.
  getByText("Privacy e diritto sul lavoro");
});
