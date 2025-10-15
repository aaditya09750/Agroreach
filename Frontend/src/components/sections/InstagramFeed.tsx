import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramPost: React.FC<{ imgSrc: string; isOverlay?: boolean }> = ({ imgSrc, isOverlay }) => (
  <div className="relative group aspect-square">
    <img src={imgSrc} alt="Instagram post" className="w-full h-full object-cover rounded-lg" />
    {isOverlay && (
      <div className="absolute inset-0 bg-green-900/80 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Instagram size={32} className="text-white" />
      </div>
    )}
  </div>
);

const InstagramFeed: React.FC = () => {
  const posts = [
    { imgSrc: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/a092/562e/6419953a4b02a8ef7292fc0b675a12ba?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mIdRtH6xIXcBfQuNwKmKi5jTDF9bWO9v8EHc9yoHCFTcdECNTPSRZvnW7LGFQD4ZiB~XoOFoKpKzYVdXaBQdv0LWTXlR2JV0XufNLGqD-iH1BNWjxeoHXZOhOeSTa1~mpOps1FGvkl5hUP8czav~zhxOP2BxDw9PyxSElt6zcl7-h9Sd-AflnxF7wQ9t-YLL5eRYxmxuHOuXQGoVFiKToV0LZ37KfOWEQ~-8vKjvoiEkozCeeOcc6R7nDPi8Psjpn8I3p46WyYU~qQt62I8aQ5fwfBYSVqPS55Vl~k03RaccjWgaAyUGqOmW9UdUojNyH8myFi6seTX4MufqbX6y6Q__' },
    { imgSrc: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/f1ea/bc95/dc84cef49e3fd166888b907d60b8a0a6?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=khfBZHuARe~muhGaHWUTsvA37CDg5OmASFrJLhdhs220BSmZ8Dgxnk46QL5vZl9KY6WCu4OUFU5F7Mgq8dKphcFTJeidSST8KF2vStwivQifJ71gfqxMBsMg7Cd4kTyRptzjXi3Hhy06fA12pfl8gxRBymq66BOAgBK5TGjzBeRnsmNwlBk3t8w9oh3e5NmES6iD1t9F3Vabn8ANdtlK72TjC~005oIPLuiTTyXtBdCkUAZPons-r7WaP~CQaNa2oca~XA~uD4HQH0XnhdhevCrw6suLYV1dnDnlPGBAxNtNznn69TkUfL2MXXuWec3B9dVsO5q84qTGxlgFHYaYug__', isOverlay: true },
    { imgSrc: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/9565/9e66/5db4588ccdfd1cc30428ad519b922885?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Jz1sir7ymfmthL~sK1KQYqnbyNibLIxOiHKrDrpn7x7HZ78~1ZfJ2yaOKGFiCYG0Umen~-3ilCI30t3Gl4NvOxXMiXOPWPYHQHw7b0jJIkSaXNrYDuzg3AE7SZzqHIFchJv6ZIMcc8Roqeh~970uRwq~pp9MHSbcTiRja8U6iQtGofLzMWpMfKbVyT6ocqeQ2mxV1OiUmKxsPiIbAnBPuvueGQd20C7FiXk0GMedwpnkjvSymaN3tb1BRZvb7o~qYRSnzE6j9maHqHUDZPvvZeTP3gDe1-wdthEiRoyXT8xuj77AqeJv8YB6q3YB-8XSVd4Dd5-0exWwp2NFD27SQA__' },
    { imgSrc: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/401b/95bd/2008c77c10030f04e796e24e05add6a7?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ohCW6IZS~ZRagKJlkjLeLRq-FWh1HVu~XbLasQ1Mj1ehaKMC1O6Rs-SPGqDtdjPoGstMa5NIME8UueJSreqk6CZ2nVn0BmipXtcGTRi5fvlDoaSr9PHUlfwvoWfsu-2rJjBDG1kbO0A0UXm9ImVYEoP6kCaBy3OV-9dT-Wz8tDGJ8X9NycoGA1I0vysby~UGQxyqx1PPQuaDuHe4JEyJv9u2ZiC1WTKI-r7N8afne~1H~3UU9k5P4JQPJ1vZjDwGAmEbKCVuR-~Aj7iiIRGp-dn6uUFsZN13vo1~G4C~ms4XoXaAlCVChh0I1F8RtrRGM26WcSSik4prcKppf1~cuw__' },
    { imgSrc: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/f9bd/c17d/fad87b3436cd9345406b1bd077d99b8e?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uSsV2sPO5DVDHlNOf94XqNe-XsIFZwLIk16zHRk-cibGduGbdcFeDSCBW7mTGe64q7KH1avF2yqJvampe6fA5TPtjyqVelPV6yR7rK3qFG0QhAC8r4BTDbsRZ6qO0iEssW~W~JE5JktJdIkI79ITfBkHdsFis9ucDHqNkpvB6MSA8vLjwFH7YUZzFQWD1RycAcC1OY83ibQMWymvr0zxVn7qyyWEla8J0fyjbZFq51mEZ7PusKzPJI7y-DbVm~DNnOv99CT3BVoK9vqcikOMxWAWLj2fgP-h3XK7n4zPU4G0h4apQhzDhxup0lCLtbmX--MksrklpnR18vg55P-YwQ__' },
    { imgSrc: 'https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/e6e5/605a/8a3afdcf3eb92e1f095b381e937d80a2?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UHgT5SFgHuxjGmHad64BpYQ067GkjtuxlX3BJqRmDXZQf36sTHh7pmAnrRSJ-ncwAtYC0JtIETwmm4oTeAzHbhF-BiRZ5-fjiySRLTpJkemOcQxrZTCll-~SD-JLCGAGVWpUTTH1MfPiWqlifHWUXrCs2ZAuGkW4xkUg9JlXwaVgf0LaFE9K0kLiMVAO2qdYj~ae1sdFgKCvjXVr5243LMsRRBnPZXE6cFxoe-DGPdGeKvFeYO93qB3-oZLUoigzg158pdEAWi1ZVBNqaOgYVfWl~4vIusltT423THYy91~k0pMMvAPrt-n~4cB193hK41Ad2yT2Rlk~FWkMRSaepg__' },
  ];

  return (
    <section>
      <h2 className="text-4xl font-semibold text-text-dark text-center mb-12">Follow us on Instagram</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {posts.map((post, index) => (
          <InstagramPost key={index} {...post} />
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
