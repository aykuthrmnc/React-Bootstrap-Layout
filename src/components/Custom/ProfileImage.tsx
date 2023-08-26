import { styled } from "styled-components"

const ProfileImage = ({ data }: any) => {

    // const Image = styled.img`
    //     position: relative;
    //     z-index: 0;
    //     border-radius: 50%;
    //     overflow: hidden;

    //     &::before {
    //         content: "";
    //         position: absolute;
    //         z-index: -2;
    //         width: 100%;
    //         height: 100%;
    //         background-color: #399953;
    //         background-repeat: no-repeat;
    //         background-size: 50% 50%, 50% 50%;
    //         background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    //         background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
    //             linear-gradient(#377af5, #377af5);
    //         animation: rotate 4s ease-in-out infinite;
    //     }

    //     &::after {
    //         content: "";
    //         position: absolute;
    //         z-index: -1;
    //         left: 6px;
    //         top: 6px;
    //         width: calc(100% - 12px);
    //         height: calc(100% - 12px);
    //         border-radius: 50%;
    //         background-repeat: no-repeat;
    //         background-size: cover;
    //         background-position: center;
    //         background-image: url(${data ? import.meta.env.VITE_BASE_IMAGE_URL + data : import.meta.env.VITE_DEFAULT_IMAGE});
    //     }

    //     @keyframes rotate {
    //         // 50% {
    //         //     transform: rotate(1turn) ;
    //         // }
    //         100% {
    //             transform: rotate(1turn);
    //         }
    //     }
    // `;

    const ImageLoader = styled.div`
        position: relative;
        /* border-radius: 50%;
        background: repeating-conic-gradient(from var(--a), #ff2770 0%, #ff2770 5%, transparent 5%, transparent 40%, #ff2770 50%);
        animation: animate 4s linear infinite; */

        @property --a
        {
            syntax: '<angle>';
            inherits: false;
            initial-value: 0deg;
        }
        @keyframes animate
        {
            0%
            {
                --a: 0deg;
            }
            100%
            {
                --a: 360deg;
            }
        }

        &::before
        {
            content: "";
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(from var(--a),transparent -2%, var(--bs-primary) 100%);
            /* background: repeating-conic-gradient(from var(--a), #45f3ff 0%, #45f3ff 5%, transparent 5%, transparent 40%, #45f3ff 50%); */
            animation: animate 5s linear infinite;
            animation-delay: -1s;
            border-radius: 50%;
        }
        /* &::after
        {
            content: "";
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(from var(--a), #ff2770 0%, #ff2770 5%, transparent 5%, transparent 40%, #ff2770 50%);
            animation: animate 4s linear infinite;
            border-radius: 50%;
        } */
    `;

    return (
        <ImageLoader>
            <img src={data?.[0]?.fotograf ? import.meta.env.VITE_BASE_IMAGE_URL + data?.[0]?.fotograf : import.meta.env.VITE_DEFAULT_IMAGE}
                className="avatar-xxl object-fit-cover rounded-circle p-1 z-5 position-relative"
                onError={({ currentTarget }: any) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = import.meta.env.VITE_DEFAULT_IMAGE;
                }} />
        </ImageLoader>
    )
}
export default ProfileImage