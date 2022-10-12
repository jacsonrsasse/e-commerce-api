import handlebars from 'handlebars';
import { IParseMailTemplate } from './interfaces';

export default class HandlebarsMailTemplate {
    public async parse({ template, variables }: IParseMailTemplate): Promise<string> {
        const parseTemplate = handlebars.compile(template);
        return parseTemplate(variables);
    }
}
