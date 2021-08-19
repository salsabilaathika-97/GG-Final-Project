import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NoImage } from '../assets';
import SongCard from '../Components/Elements/songCard';

describe("SongCard", () => {
    function dummyListing() {
        return true
    }
    it("Rendered", () => {
        render(<SongCard trackUri="empty" title="abcde" album="yeye" artist="cal" image={NoImage} listingTracks={dummyListing}  />)
    });
    it("Checkbox element should exist", () => {
        const { container } = render(<SongCard trackUri="empty" title="abcde" album="yeye" artist="cal" image={NoImage} listingTracks={dummyListing}  />);
        expect(container.querySelector(".MuiCheckbox-colorPrimary")).toBeInTheDocument();
    })
    it("User can check to select song card", () => {
        const { container } = render(<SongCard trackUri="empty" title="abcde" album="yeye" artist="cal" image={NoImage} listingTracks={dummyListing}  />)
        const checkSong = container.querySelector("input");
        const checkElement = container.querySelector(".MuiCheckbox-colorPrimary");
        userEvent.click(checkSong);
        const resChecked = checkElement.classList.contains('Mui-checked');
        expect(resChecked).toBeTruthy();
    })  
})