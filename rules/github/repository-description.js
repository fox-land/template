import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import detectIndent from 'detect-indent'
import { execa } from 'execa'

import { makeRule, pkgRoot } from '../../util/util.js'
import { octokit } from '../../util/octokit.js'

/** @type {import('../../util/util.js').RuleMaker} */
export async function rule({ project }) {
	return

	const { data } = await octokit.rest.repos.get({
		owner: project.owner,
		repo: project.name,
	})

	await makeRule(() => {
		return {
			description: 'Repository description must end with punctuation',
			async shouldFix() {
				if (typeof data.description === 'undefined' || data.description === null) return true
				return !(data.description.endsWith('.') || data.description.endsWith('?') || data.description.endsWith('!'))
			},
			// TODO:  use gh repo edit --description
		}
	})
}