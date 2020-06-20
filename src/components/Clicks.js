import React from 'react';
import { Link } from 'react-router-dom';


// Button -- Box Styled, Colored
export function Button({ label, shape, color, ...rest }) {
    return <a className="button-root" {...rest}><div className={`button-${shape}-${color}`}>{label}</div></a>;
}


// Link -- In-Text, Highlighted
export function Intext({ href, label, flat, invert, ...rest }) {
    if (!href) { return <p className="intext" {...rest}>{label}</p>; }
    if (flat) {
        let type = "reg";

        if (invert) {
            type = "invert";
        }
        return (
            <Link className={`flattext-${type}`} to={href} {...rest}>
                {label}
            </Link>
        )
    }
    if (href.startsWith("/") || href.startsWith(".") || href.startsWith("#")) {
        return (
            <Link className="intext" to={href} {...rest}>
                {label}
            </Link>
        );
    }

    return (
        <a className="intext" href={href} {...rest}>
            {label}
            <i className="sup fas fa-external-link-square-alt"></i>
        </a>
    );
}

export function Tag(props) {
    return (
        <Link className="tag" key={props.tag} to={`/tag/${props.tag}`}>#{props.tag}</Link>
    )
}