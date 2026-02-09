import { Button } from "../components/common/Button";

export const HomePage = () => {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <>
      HomePage
      <Button onClick={handleClick}>
        выйти
      </Button>
    </>
  );
}