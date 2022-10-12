interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

export { ITemplateVariable, IParseMailTemplate };
