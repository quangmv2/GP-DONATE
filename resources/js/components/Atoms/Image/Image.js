import React, { PureComponent } from "react";
// import { PropTypes } from "prop-types";
import "./image.scss";
import cn from "classnames";
import { Spin, Icon } from "antd";

const loadingIcon = <Icon spin style={{ fontSize: 24 }} type="loading" />;
export class Image extends PureComponent {
    constructor() {
        super();
        this.state = {
            failed: false,
            isLoading: true
        };
    }

    loadImageFailed = () => {
        this.setState({
            failed: true,
            isLoading: false
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({ isLoading: true });
        }
    }

    handleImageLoaded = () => {
        this.setState({
            isLoading: false
        });
    };

    render() {
        const {
            isHasBackgroundImage,
            src,
            alt,
            isParallax,
            type,
            title,
            className,
            classNameWrapper
        } = this.props;
        const { failed, isLoading } = this.state;
        let xhtml = null;
        if (isHasBackgroundImage) {
            const style = {
                backgroundImage: `url(${src})`,
                backgroundSize: type,
                backgroundPosition: "center",
                backgroundAttachment: isParallax ? "fixed" : ""
            };
            xhtml = (
                <div
                    className="image-cus-wrapper"
                    style={style}
                    title={title}
                />
            );
        } else {
            xhtml = !failed ? (
                <>
                    {isLoading && <Spin indicator={loadingIcon} />}
                    <div
                        className={classNameWrapper}
                        style={{ width: isLoading ? 0 : undefined }}
                    >
                        <img
                            alt={alt}
                            className={cn("img", className)}
                            onError={this.loadImageFailed}
                            onLoad={this.handleImageLoaded}
                            src={src}
                            title={title}
                        />
                    </div>
                </>
            ) : null;
        }
        return xhtml;
    }
}

export default Image;
