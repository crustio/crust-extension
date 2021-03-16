const abi = {
  metadataVersion: '0.1.0',
  source: {
    hash: '0xa1aa87fbf57221a9fa46b4b195476fac6511dd50c242b41a0246ce5679d4cae1',
    language: 'ink! 3.0.0-rc2',
    compiler: 'rustc 1.48.0-nightly',
  },
  contract: {
    name: 'entropy',
    version: '0.1.0',
    authors: ['Gavin Fu <gavfu@outlook.com>'],
  },
  spec: {
    constructors: [
      {
        args: [
          {
            name: 'initial_supply',
            type: {
              displayName: ['Balance'],
              type: 3,
            },
          },
          {
            name: 'name',
            type: {
              displayName: ['String'],
              type: 1,
            },
          },
          {
            name: 'symbol',
            type: {
              displayName: ['String'],
              type: 1,
            },
          },
          {
            name: 'decimals',
            type: {
              displayName: ['u32'],
              type: 2,
            },
          },
        ],
        docs: [' Creates a new Entropy contract with the specified initial supply'],
        name: ['construct'],
        selector: '0x26220b3b',
      },
      {
        args: [
          {
            name: 'initial_supply',
            type: {
              displayName: ['Balance'],
              type: 3,
            },
          },
        ],
        docs: [],
        name: ['new'],
        selector: '0xd183512b',
      },
      {
        args: [],
        docs: [],
        name: ['default'],
        selector: '0x6a3712e2',
      },
    ],
    docs: [],
    events: [
      {
        args: [
          {
            docs: [],
            indexed: true,
            name: 'from',
            type: {
              displayName: ['Option'],
              type: 16,
            },
          },
          {
            docs: [],
            indexed: true,
            name: 'to',
            type: {
              displayName: ['Option'],
              type: 16,
            },
          },
          {
            docs: [],
            indexed: true,
            name: 'value',
            type: {
              displayName: ['Balance'],
              type: 3,
            },
          },
        ],
        docs: [' Event emitted when a token transfer occurs.'],
        name: 'Transfer',
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            name: 'owner',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
          {
            docs: [],
            indexed: true,
            name: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
          {
            docs: [],
            indexed: true,
            name: 'value',
            type: {
              displayName: ['Balance'],
              type: 3,
            },
          },
        ],
        docs: [
          ' Event emitted when an approval occurs that `spender` is allowed to withdraw',
          ' up to the amount of `value` tokens from `owner`.',
        ],
        name: 'Approval',
      },
    ],
    messages: [
      {
        args: [],
        docs: [],
        mutates: false,
        name: ['name'],
        payable: false,
        returnType: {
          displayName: ['String'],
          type: 1,
        },
        selector: '0xa0a95494',
      },
      {
        args: [],
        docs: [],
        mutates: false,
        name: ['symbol'],
        payable: false,
        returnType: {
          displayName: ['String'],
          type: 1,
        },
        selector: '0x57178a4a',
      },
      {
        args: [],
        docs: [],
        mutates: false,
        name: ['decimals'],
        payable: false,
        returnType: {
          displayName: ['u32'],
          type: 2,
        },
        selector: '0x9f700f55',
      },
      {
        args: [],
        docs: [' Returns the total token supply.'],
        mutates: false,
        name: ['total_supply'],
        payable: false,
        returnType: {
          displayName: ['Balance'],
          type: 3,
        },
        selector: '0xdcb736b5',
      },
      {
        args: [
          {
            name: 'owner',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
        ],
        docs: [
          ' Returns the account balance for the specified `owner`.',
          '',
          ' Returns `0` if the account is non-existent.',
        ],
        mutates: false,
        name: ['balance_of'],
        payable: false,
        returnType: {
          displayName: ['Balance'],
          type: 3,
        },
        selector: '0x56e929b2',
      },
      {
        args: [
          {
            name: 'owner',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
          {
            name: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
        ],
        docs: [
          ' Returns the amount which `spender` is still allowed to withdraw from `owner`.',
          '',
          ' Returns `0` if no allowance has been set `0`.',
        ],
        mutates: false,
        name: ['allowance'],
        payable: false,
        returnType: {
          displayName: ['Balance'],
          type: 3,
        },
        selector: '0xf3cfff66',
      },
      {
        args: [
          {
            name: 'to',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
          {
            name: 'value',
            type: {
              displayName: ['Balance'],
              type: 3,
            },
          },
        ],
        docs: [
          " Transfers `value` amount of tokens from the caller's account to account `to`.",
          '',
          ' On success a `Transfer` event is emitted.',
          '',
          ' # Errors',
          '',
          ' Returns `InsufficientBalance` error if there are not enough tokens on',
          " the caller's account balance.",
        ],
        mutates: true,
        name: ['transfer'],
        payable: false,
        returnType: {
          displayName: ['Result'],
          type: 13,
        },
        selector: '0xfae3a09d',
      },
      {
        args: [
          {
            name: 'spender',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
          {
            name: 'value',
            type: {
              displayName: ['Balance'],
              type: 3,
            },
          },
        ],
        docs: [
          " Allows `spender` to withdraw from the caller's account multiple times, up to",
          ' the `value` amount.',
          '',
          ' If this function is called again it overwrites the current allowance with `value`.',
          '',
          ' An `Approval` event is emitted.',
        ],
        mutates: true,
        name: ['approve'],
        payable: false,
        returnType: {
          displayName: ['Result'],
          type: 13,
        },
        selector: '0x03d0e114',
      },
      {
        args: [
          {
            name: 'from',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
          {
            name: 'to',
            type: {
              displayName: ['AccountId'],
              type: 6,
            },
          },
          {
            name: 'value',
            type: {
              displayName: ['Balance'],
              type: 3,
            },
          },
        ],
        docs: [
          ' Transfers `value` tokens on the behalf of `from` to the account `to`.',
          '',
          ' This can be used to allow a contract to transfer tokens on ones behalf and/or',
          ' to charge fees in sub-currencies, for example.',
          '',
          ' On success a `Transfer` event is emitted.',
          '',
          ' # Errors',
          '',
          ' Returns `InsufficientAllowance` error if there are not enough tokens allowed',
          ' for the caller to withdraw from `from`.',
          '',
          ' Returns `InsufficientBalance` error if there are not enough tokens on',
          ' the the account balance of `from`.',
        ],
        mutates: true,
        name: ['transfer_from'],
        payable: false,
        returnType: {
          displayName: ['Result'],
          type: 13,
        },
        selector: '0xfcfb2ccd',
      },
    ],
  },
  storage: {
    struct: {
      fields: [
        {
          layout: {
            cell: {
              key: '0x0000000000000000000000000000000000000000000000000000000000000000',
              ty: 1,
            },
          },
          name: 'name',
        },
        {
          layout: {
            cell: {
              key: '0x0100000000000000000000000000000000000000000000000000000000000000',
              ty: 1,
            },
          },
          name: 'symbol',
        },
        {
          layout: {
            cell: {
              key: '0x0200000000000000000000000000000000000000000000000000000000000000',
              ty: 2,
            },
          },
          name: 'decimals',
        },
        {
          layout: {
            cell: {
              key: '0x0300000000000000000000000000000000000000000000000000000000000000',
              ty: 3,
            },
          },
          name: 'total_supply',
        },
        {
          layout: {
            struct: {
              fields: [
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            cell: {
                              key:
                                '0x0400000000000000000000000000000000000000000000000000000000000000',
                              ty: 4,
                            },
                          },
                          name: 'header',
                        },
                        {
                          layout: {
                            struct: {
                              fields: [
                                {
                                  layout: {
                                    cell: {
                                      key:
                                        '0x0500000000000000000000000000000000000000000000000000000000000000',
                                      ty: 2,
                                    },
                                  },
                                  name: 'len',
                                },
                                {
                                  layout: {
                                    array: {
                                      cellsPerElem: 1,
                                      layout: {
                                        cell: {
                                          key:
                                            '0x0500000001000000000000000000000000000000000000000000000000000000',
                                          ty: 5,
                                        },
                                      },
                                      len: 4294967295,
                                      offset:
                                        '0x0600000000000000000000000000000000000000000000000000000000000000',
                                    },
                                  },
                                  name: 'elems',
                                },
                              ],
                            },
                          },
                          name: 'entries',
                        },
                      ],
                    },
                  },
                  name: 'keys',
                },
                {
                  layout: {
                    hash: {
                      layout: {
                        cell: {
                          key: '0x0600000001000000000000000000000000000000000000000000000000000000',
                          ty: 10,
                        },
                      },
                      offset: '0x0500000001000000000000000000000000000000000000000000000000000000',
                      strategy: {
                        hasher: 'Blake2x256',
                        postfix: '',
                        prefix: '0x696e6b20686173686d6170',
                      },
                    },
                  },
                  name: 'values',
                },
              ],
            },
          },
          name: 'balances',
        },
        {
          layout: {
            struct: {
              fields: [
                {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            cell: {
                              key:
                                '0x0600000001000000000000000000000000000000000000000000000000000000',
                              ty: 4,
                            },
                          },
                          name: 'header',
                        },
                        {
                          layout: {
                            struct: {
                              fields: [
                                {
                                  layout: {
                                    cell: {
                                      key:
                                        '0x0700000001000000000000000000000000000000000000000000000000000000',
                                      ty: 2,
                                    },
                                  },
                                  name: 'len',
                                },
                                {
                                  layout: {
                                    array: {
                                      cellsPerElem: 1,
                                      layout: {
                                        cell: {
                                          key:
                                            '0x0700000002000000000000000000000000000000000000000000000000000000',
                                          ty: 11,
                                        },
                                      },
                                      len: 4294967295,
                                      offset:
                                        '0x0800000001000000000000000000000000000000000000000000000000000000',
                                    },
                                  },
                                  name: 'elems',
                                },
                              ],
                            },
                          },
                          name: 'entries',
                        },
                      ],
                    },
                  },
                  name: 'keys',
                },
                {
                  layout: {
                    hash: {
                      layout: {
                        cell: {
                          key: '0x0800000002000000000000000000000000000000000000000000000000000000',
                          ty: 10,
                        },
                      },
                      offset: '0x0700000002000000000000000000000000000000000000000000000000000000',
                      strategy: {
                        hasher: 'Blake2x256',
                        postfix: '',
                        prefix: '0x696e6b20686173686d6170',
                      },
                    },
                  },
                  name: 'values',
                },
              ],
            },
          },
          name: 'allowances',
        },
      ],
    },
  },
  types: [
    {
      def: {
        primitive: 'str',
      },
    },
    {
      def: {
        primitive: 'u32',
      },
    },
    {
      def: {
        primitive: 'u128',
      },
    },
    {
      def: {
        composite: {
          fields: [
            {
              name: 'last_vacant',
              type: 2,
            },
            {
              name: 'len',
              type: 2,
            },
            {
              name: 'len_entries',
              type: 2,
            },
          ],
        },
      },
      path: ['ink_storage', 'collections', 'stash', 'Header'],
    },
    {
      def: {
        variant: {
          variants: [
            {
              fields: [
                {
                  type: 9,
                },
              ],
              name: 'Vacant',
            },
            {
              fields: [
                {
                  type: 6,
                },
              ],
              name: 'Occupied',
            },
          ],
        },
      },
      params: [6],
      path: ['ink_storage', 'collections', 'stash', 'Entry'],
    },
    {
      def: {
        composite: {
          fields: [
            {
              type: 7,
            },
          ],
        },
      },
      path: ['ink_env', 'types', 'AccountId'],
    },
    {
      def: {
        array: {
          len: 32,
          type: 8,
        },
      },
    },
    {
      def: {
        primitive: 'u8',
      },
    },
    {
      def: {
        composite: {
          fields: [
            {
              name: 'next',
              type: 2,
            },
            {
              name: 'prev',
              type: 2,
            },
          ],
        },
      },
      path: ['ink_storage', 'collections', 'stash', 'VacantEntry'],
    },
    {
      def: {
        composite: {
          fields: [
            {
              name: 'value',
              type: 3,
            },
            {
              name: 'key_index',
              type: 2,
            },
          ],
        },
      },
      params: [3],
      path: ['ink_storage', 'collections', 'hashmap', 'ValueEntry'],
    },
    {
      def: {
        variant: {
          variants: [
            {
              fields: [
                {
                  type: 9,
                },
              ],
              name: 'Vacant',
            },
            {
              fields: [
                {
                  type: 12,
                },
              ],
              name: 'Occupied',
            },
          ],
        },
      },
      params: [12],
      path: ['ink_storage', 'collections', 'stash', 'Entry'],
    },
    {
      def: {
        tuple: [6, 6],
      },
    },
    {
      def: {
        variant: {
          variants: [
            {
              fields: [
                {
                  type: 14,
                },
              ],
              name: 'Ok',
            },
            {
              fields: [
                {
                  type: 15,
                },
              ],
              name: 'Err',
            },
          ],
        },
      },
      params: [14, 15],
      path: ['Result'],
    },
    {
      def: {
        tuple: [],
      },
    },
    {
      def: {
        variant: {
          variants: [
            {
              discriminant: 0,
              name: 'InsufficientBalance',
            },
            {
              discriminant: 1,
              name: 'InsufficientAllowance',
            },
          ],
        },
      },
      path: ['entropy', 'entropy', 'Error'],
    },
    {
      def: {
        variant: {
          variants: [
            {
              name: 'None',
            },
            {
              fields: [
                {
                  type: 6,
                },
              ],
              name: 'Some',
            },
          ],
        },
      },
      params: [6],
      path: ['Option'],
    },
  ],
};

export default abi;
