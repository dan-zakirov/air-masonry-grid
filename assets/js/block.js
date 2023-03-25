(function (blocks, editor, components, i18n, element) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var __ = i18n.__; // Define the __() function for localization

    // Register the block
    registerBlockType('air-masonry-grid/air-masonry-grid', {
        title: __('Air Masonry Grid', 'air-masonry-grid'),
        description: __('A custom block for Air Masonry Grid', 'air-masonry-grid'),
        icon: 'layout',
        category: 'design',// Define block attributes
        attributes: {
            items: {
                type: 'array',
                default: [],
            },
            columnCount: {
                type: 'number',
                default: 2,
            },
            columnGap: {
                type: 'number',
                default: 10,
            },
            fontSize: {
                type: 'number',
                default: 16,
            },
        },    // Define block edit function
        edit: function (props) {
            // Get attributes
            var items = props.attributes.items;
            var columnCount = props.attributes.columnCount;
            var columnGap = props.attributes.columnGap;
            var fontSize = props.attributes.fontSize;

            // Define functions to handle attribute changes
            var setColumnCount = function (value) {
                props.setAttributes({columnCount: value});
            };

            var setColumnGap = function (value) {
                props.setAttributes({columnGap: value});
            };

            var setFontSize = function (value) {
                props.setAttributes({fontSize: value});
            };

            var addItem = function () {
                var newItems = items.slice();
                newItems.push({
                    content: '',
                });
                props.setAttributes({items: newItems});
            };

            var updateItem = function (index, newContent) {
                var newItems = items.slice();
                newItems[index].content = newContent;
                props.setAttributes({items: newItems});
            };

            var deleteItem = function (index) {
                var newItems = items.slice();
                newItems.splice(index, 1);
                props.setAttributes({items: newItems});
            };

            // Render block edit view
            return [
                el(
                    'div',
                    {
                        className: 'air-masonry-grid',
                        style: {
                            columnCount: columnCount,
                            columnGap: columnGap + 'px',
                        },
                    },
                    items.map(function (item, index) {
                        return el('div', {
                            key: index,
                            className: 'air-col-block',
                            style: {
                                fontSize: fontSize + 'px',
                            },
                        }, [
                            el(editor.RichText, {
                                tagName: 'p',
                                placeholder: __('Enter text here', 'air-masonry-grid'),
                                value: item.content,
                                onChange: function (value) {
                                    updateItem(index, value);
                                }
                            }),
                            el('div', {
                                className: 'air-col-actions',
                            }, [
                                el('button', {
                                    className: 'button-secondary air-col-delete',
                                    onClick: function () {
                                        deleteItem(index);
                                    },
                                }, __('Delete item', 'air-masonry-grid')),
                            ]),
                        ]);
                    }),
                    el('button', {
                        className: 'components-button is-primary air-col-add',
                        onClick: addItem,
                    }, __('Add Item', 'air-masonry-grid'))
                ),
                el(InspectorControls, {
                    key: 'inspector',
                }, [
                    el(PanelBody, {
                        title: __('Settings', 'air-masonry-grid'),
                    }, [
                        el(RangeControl, {
                            label: __('Number of Columns', 'air-masonry-grid'),
                            value: columnCount,
                            min: 1,
                            max: 5,
                            onChange: setColumnCount,
                        }),
                        el(RangeControl, {
                            label: __('Column Gap', 'air-masonry-grid'),
                            value: columnGap,
                            min: 0,
                            max: 50,
                            onChange: setColumnGap,
                        }),
                        el(RangeControl, {
                            label: __('Font Size', 'air-masonry-grid'),
                            value: fontSize,
                            min: 10,
                            max: 30,
                            onChange: setFontSize,
                        }),
                    ]),
                ]),
            ];
        },
        // Define block save function
        save: function(props) {
            return el(
                'div',
                {
                    className: 'air-masonry-grid',
                    style: {
                        columnCount: props.attributes.columnCount,
                        columnGap: props.attributes.columnGap + 'px',
                    },
                },
                props.attributes.items.map(function (item) {
                    return el('div', {
                        className: 'air-col-block',
                        style: {
                            backgroundColor: props.attributes.backgroundColor,
                            color: props.attributes.textColor,
                            fontSize: props.attributes.fontSize + 'px',
                        },
                    }, el(editor.RichText.Content, {
                        tagName: 'p',
                        value: item.content,
                    }));
                })
            );
        },
    });
}(window.wp.blocks, window.wp.editor, window.wp.components, window.wp.i18n, window.wp.element));

