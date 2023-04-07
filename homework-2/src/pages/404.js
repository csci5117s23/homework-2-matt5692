/** @jsxImportSource @emotion/react */
import { header } from "@/styles/styles";

export default function Custom404(){
    return(<>
        <div className="pure-g">
            <div className="pure-u-1" css={header}>
                <h1>Page not found</h1>
                <h2>Try going back to the homepage</h2>
            </div>
        </div>
        </>);
}