declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"articles": {
"about.md": {
  id: "about.md",
  slug: "about",
  body: string,
  collection: "articles",
  data: any
},
},
"blogs": {
"mixtapes.md": {
  id: "mixtapes.md",
  slug: "mixtapes",
  body: string,
  collection: "blogs",
  data: any
},
},
"galleries": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "galleries",
  data: any
},
},
"mixes": {
"first-lady-of-neo-soul.md": {
  id: "first-lady-of-neo-soul.md",
  slug: "first-lady-of-neo-soul",
  body: string,
  collection: "mixes",
  data: any
},
"hai-tekku.md": {
  id: "hai-tekku.md",
  slug: "hai-tekku",
  body: string,
  collection: "mixes",
  data: any
},
"hello.md": {
  id: "hello.md",
  slug: "hello",
  body: string,
  collection: "mixes",
  data: any
},
"kemettosaturn.md": {
  id: "kemettosaturn.md",
  slug: "kemettosaturn",
  body: string,
  collection: "mixes",
  data: any
},
"nyc-subway.md": {
  id: "nyc-subway.md",
  slug: "nyc-subway",
  body: string,
  collection: "mixes",
  data: any
},
"okinawa.md": {
  id: "okinawa.md",
  slug: "okinawa",
  body: string,
  collection: "mixes",
  data: any
},
"tokyo-nights.md": {
  id: "tokyo-nights.md",
  slug: "tokyo-nights",
  body: string,
  collection: "mixes",
  data: any
},
"tokyo-tasogare-2.md": {
  id: "tokyo-tasogare-2.md",
  slug: "tokyo-tasogare-2",
  body: string,
  collection: "mixes",
  data: any
},
"uno-melodic-introduction-to-the-80s.md": {
  id: "uno-melodic-introduction-to-the-80s.md",
  slug: "uno-melodic-introduction-to-the-80s",
  body: string,
  collection: "mixes",
  data: any
},
"yacht-rock.md": {
  id: "yacht-rock.md",
  slug: "yacht-rock",
  body: string,
  collection: "mixes",
  data: any
},
},
"pages": {
"about.md": {
  id: "about.md",
  slug: "about",
  body: string,
  collection: "pages",
  data: any
},
"hai-tekku.md": {
  id: "hai-tekku.md",
  slug: "mixtapes/hai-tekku",
  body: string,
  collection: "pages",
  data: any
},
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "pages",
  data: any
},
"kemettosaturn.md": {
  id: "kemettosaturn.md",
  slug: "mixtapes/cosmic-jazz",
  body: string,
  collection: "pages",
  data: any
},
"mixtapes.md": {
  id: "mixtapes.md",
  slug: "mixtapes",
  body: string,
  collection: "pages",
  data: any
},
},
"templates": {
"blog-post.md": {
  id: "blog-post.md",
  slug: "blog-post",
  body: string,
  collection: "templates",
  data: any
},
"standalone.md": {
  id: "standalone.md",
  slug: "standalone",
  body: string,
  collection: "templates",
  data: any
},
},

	};

	type ContentConfig = never;
}
